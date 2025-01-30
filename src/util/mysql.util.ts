import { Injectable } from '@nestjs/common';
import * as Mysql from 'mysql2';

@Injectable()
export class MysqlUtil {
  private pool: Mysql.Pool;

  constructor() {
    this.pool = Mysql.createPool({
      host: process.env.DATABASE_URL,
      port: parseInt(process.env.DATABASE_PORT || '3306'),
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: process.env.DATABASE_WAIT_FOR_CONNECTION === 'true',
      connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
      charset: 'utf8mb4',
      queryFormat: (query: string, values: any) => {
        let queryResult: string | null = null;

        if (!values) {
          queryResult = query;
        }

        if (queryResult === 'COMMIT' || queryResult === 'START TRANSACTION') {
          return queryResult;
        }

        if (values) {
          if (Array.isArray(values)) {
            let index = -1;

            queryResult = query.replace(/:\?/g, () => {
              index += 1;
              return this.pool.escape(values[index]);
            });
          } else {
            // eslint-disable-next-line func-names
            queryResult = query.replace(/:(\w+)/g, (text, key) => {
              let localQuery = '';

              if (Object.prototype.hasOwnProperty.call(values, key) === true) {
                localQuery = this.pool.escape(values[key]);
              } else {
                localQuery = text;
              }

              return localQuery;
            });
          }
        }

        if (process.env.DATABASE_LOGGING === 'true') {
          console.info(`query > ${queryResult}`);
        }

        return queryResult;
      },
    });
  }

  async beginTransaction(): Promise<Mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          return reject(error);
        }

        connection.beginTransaction((error) => {
          reject(error);
        });

        resolve(connection);
      });
    });
  }

  async endTransaction(connection: Mysql.PoolConnection) {
    return new Promise((resolve) => {
      connection.commit();
      connection.release();

      resolve(connection);
    });
  }

  async rollback(connection: Mysql.PoolConnection) {
    return new Promise((resolve) => {
      connection.rollback(function () {});
      connection.release();

      resolve(connection);
    });
  }

  async query(
    connection: Mysql.PoolConnection,
    query: string,
    params?: any,
  ): Promise<
    Mysql.RowDataPacket | Mysql.RowDataPacket[] | Mysql.RowDataPacket[][] | Mysql.OkPacket | Mysql.OkPacket[] | Mysql.ResultSetHeader
  > {
    return new Promise((resolve, reject) => {
      if (!connection) {
        return reject(new Error('query() > connection is empty '));
      }

      if (!params) {
        params = {};
      }
      connection.query(query, params, (error, rows) => {
        if (error) {
          return reject(error);
        }

        if (Array.isArray(rows) && rows.length === 1 && Object.keys(rows[0]).length === 1) {
          resolve(rows[0]);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async queryOne(
    query: string,
    params?: any,
  ): Promise<
    Mysql.RowDataPacket | Mysql.RowDataPacket[] | Mysql.RowDataPacket[][] | Mysql.OkPacket | Mysql.OkPacket[] | Mysql.ResultSetHeader
  > {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          return reject(error);
        }

        if (!params) {
          params = {};
        }

        connection.query(query, params, (error2, rows) => {
          if (error2) {
            connection.rollback(() => {});
            connection.release();

            return reject(error2);
          }

          connection.release();

          if (Array.isArray(rows) && rows.length === 1 && Object.keys(rows[0]).length === 1) {
            resolve(rows[0]);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }
}
