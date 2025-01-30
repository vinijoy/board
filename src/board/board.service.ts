import { Injectable } from '@nestjs/common';
import { MysqlUtil } from 'src/util/mysql.util';
import { BoardQuery } from './board.query';
import { BoardList } from 'src/data/model/board.list';

@Injectable()
export class BoardService {
  constructor(private mysql: MysqlUtil, private query: BoardQuery) {}

  async getBoardList() {
    const selectBoardList = this.query.selectBoardList();
    const list = (await this.mysql.queryOne(selectBoardList)) as BoardList[];

    return list;
  }
}
