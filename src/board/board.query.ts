import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardQuery {
  selectBoardList() {
    const q = `
      select
        b_no,
        b_name,
        b_id
      from
        tbl_board_list
      order by b_no asc
    `;

    return q;
  }
}
