import { Injectable } from '@nestjs/common';
import { ReqCreateBoardDto } from 'src/dto/board/create.board';

@Injectable()
export class BoardQuery {
  insertBoard(data: ReqCreateBoardDto) {
    const q =`
      insert into
      tbl_board_list
      (b_name, b_id)
      values
      (
        :b_name,
        :b_id
      )
    `;

    return q;
  }
}
