import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MysqlUtil } from 'src/util/mysql.util';
import { BoardQuery } from './board.query';
import { ReqReadBoardInfoDto } from 'src/dto/board/read.board';
import { ReqReadPostListDto } from 'src/dto/post/read.post';
import { ReqReadPostInfoDto } from 'src/dto/post/read.post';
import { BoardList } from 'src/data/model/board.list';
import { BoardInfo } from 'src/data/model/board.info';
import { BoardName } from 'src/data/model/board.name';
import { PostCount } from 'src/data/model/post.count';
import { PostList } from 'src/data/model/post.list';
import { BoardNo } from 'src/data/model/board.no';
import { PostInfo } from 'src/data/model/post.info';

@Injectable()
export class BoardService {
  constructor(private mysql: MysqlUtil, private query: BoardQuery) {}

  async getBoardList() {
    const selectBoardList = this.query.selectBoardList();
    const list = (await this.mysql.queryOne(selectBoardList)) as BoardList[];

    return list;
  }

  async getBoardInfo(data: ReqReadBoardInfoDto) {
    const selectBoardInfo = this.query.selectBoardInfo();
    const info = (await this.mysql.queryOne(selectBoardInfo, data)) as BoardInfo[];

    return info[0];
  }

  async getBoardName(b_id: string) {
    const selectBoardName = this.query.selectBoardName();
    const name = (await this.mysql.queryOne(selectBoardName, { b_id })) as BoardName[];

    return name;
  }

  async getPostCount(data: ReqReadPostListDto) {
    const selectPostCount = this.query.selectPostCount(data);
    const count = (await this.mysql.queryOne(selectPostCount, data)) as PostCount[];

    return count;
  }

  async getPostList(data: ReqReadPostListDto) {
    const selectPostList = this.query.selectPostList(data);
    const list = (await this.mysql.queryOne(selectPostList, data)) as PostList[];

    if (list.length > 0) {
      list.forEach((item, index) => {
        if (item.bc_create_dt) {
          list[index].bc_create_dt = this.formatDate(item.bc_create_dt);
        }
      });
    }

    return list;
  }

  async getBoardNo(b_id: string) {
    const selectBoardNo = this.query.selectBoardNo();
    const no = (await this.mysql.queryOne(selectBoardNo, { b_id })) as BoardNo[];

    return no;
  }

  async getPostInfo(bc_no: number) {
    const selectPostInfo = this.query.selectPostInfo();
    const info = (await this.mysql.queryOne(selectPostInfo, { bc_no })) as PostInfo[];

    if (info.length > 0) {
      if (info[0].bc_create_dt) {
        info[0].bc_create_dt = this.formatDate(info[0].bc_create_dt);
      }
      if (info[0].bc_update_dt) {
        info[0].bc_update_dt = this.formatDate(info[0].bc_update_dt);
      }
    }

    return info[0];
  }

  private formatDate(dateString: string): string {
    const dateObject = new Date(dateString);
    return `${dateObject.getFullYear()}-${String(dateObject.getMonth() + 1).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')} ${String(dateObject.getHours()).padStart(2, '0')}:${String(dateObject.getMinutes()).padStart(2, '0')}:${String(dateObject.getSeconds()).padStart(2, '0')}`;
  }
}
