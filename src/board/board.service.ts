import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MysqlUtil } from 'src/util/mysql.util';
import { BoardQuery } from './board.query';
import { Admin } from 'src/data/model/admin';
import { BoardList } from 'src/data/model/board.list';
import { ADMIN_LOG_TYPE, ADMIN_TYPE, CODE_SEARCH_TYPE, COMMON_QUERY, NY_TYPE, RESPONSE_CODE, TEACHER_PAPER_TYPE } from 'src/data/enum';

@Injectable()
export class BoardService {
  constructor(private mysql: MysqlUtil, private query: BoardQuery) {}

  async getAdminTypeById(aId: string) {
    const selectAdminById = this.query.selectAdminById();
    const list = (await this.mysql.queryOne(selectAdminById, {
      a_id: aId,
    })) as Admin[];

    if (!list.length) {
      return RESPONSE_CODE.NO_DATA;
    } else if (!list[0].a_type) {
      return RESPONSE_CODE.INVALID;
    }

    return list[0].a_type;
  }

  async getBoardList() {
    const selectBoardList = this.query.selectBoardList();
    const list = (await this.mysql.queryOne(selectBoardList)) as BoardList[];

    return list;
  }
}
