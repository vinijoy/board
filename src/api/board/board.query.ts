import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardQuery {
  insertBoard() {
    const q =`
      insert into
      tbl_board_list
      (
        b_name,
        b_id
      )
      values
      (
        :b_name,
        :b_id
      )
    `;

    return q;
  }

  updateBoard() {
    const q =`
      update
      tbl_board_list
      set
        b_name = :b_name,
        b_id = :b_id
      where
        b_no = :b_no
    `;

    return q;
  }

  deleteBoard() {
    const q =`
      delete
      from
        tbl_board_list
      where
        b_no = :b_no
    `;

    return q;
  }
}
