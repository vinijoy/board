import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PoolConnection, RowDataPacket } from 'mysql2';
import { JwtService } from '@nestjs/jwt';
import { GeneralUtil } from 'src/util/general.util';
import { MysqlUtil } from 'src/util/mysql.util';
import { BoardQuery } from './board.query';
import { COMMON_CODE, COMMON_CODE_GROUP } from 'src/data/constant';
import { CommonCode } from 'src/data/model/common.code';
import { ReqCreateBoardDto } from 'src/dto/board/create.board';
import { ReqModifyBoardDto } from 'src/dto/board/modify.board';
import { ReqRemoveBoardDto } from 'src/dto/board/remove.board';

@Injectable()
export class BoardService {
  constructor(private jwtService: JwtService, private mysql: MysqlUtil, private query: BoardQuery, private util: GeneralUtil) {}

  async createBoard(data: ReqCreateBoardDto) {
    try {
      const insertBoard = this.query.insertBoard();
      await this.mysql.queryOne(insertBoard, data);
    } catch (error) {
      console.log(error);
    }
  }

  async modifyBoard(data: ReqModifyBoardDto) {
    try {
      const updateBoard = this.query.updateBoard();
      await this.mysql.queryOne(updateBoard, data);
    } catch (error) {
      console.log(error);
    }
  }

  async removeBoard(data: ReqRemoveBoardDto) {
    try {
      const deleteBoard = this.query.deleteBoard();
      await this.mysql.queryOne(deleteBoard, data);
    } catch (error) {
      console.log(error);
    }
  }
}
