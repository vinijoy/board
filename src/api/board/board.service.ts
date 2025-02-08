import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GeneralUtil } from 'src/util/general.util';
import { MysqlUtil } from 'src/util/mysql.util';
import { BoardQuery } from './board.query';
import { ReqCreateBoardDto } from 'src/dto/board/create.board';
import { ReqModifyBoardDto } from 'src/dto/board/modify.board';
import { ReqRemoveBoardDto } from 'src/dto/board/remove.board';

@Injectable()
export class BoardService {
  constructor(private mysql: MysqlUtil, private query: BoardQuery) {}

  async createBoard(data: ReqCreateBoardDto) {
    try {
      const insertBoard = this.query.insertBoard();
      await this.mysql.queryOne(insertBoard, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미 존재하는 게시판 식별자입니다.');
    }
  }

  async modifyBoard(data: ReqModifyBoardDto) {
    try {
      const updateBoard = this.query.updateBoard();
      await this.mysql.queryOne(updateBoard, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미 존재하는 게시판 식별자입니다.');
    }
  }

  async removeBoard(data: ReqRemoveBoardDto) {
    try {
      const deleteBoard = this.query.deleteBoard();
      await this.mysql.queryOne(deleteBoard, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('delete 시도 중 서버에 문제가 발생했습니다.');
    }
  }
}
