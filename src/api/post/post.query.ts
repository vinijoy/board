import { Injectable } from '@nestjs/common';

@Injectable()
export class PostQuery {
  insertPost() {
    const q =`
      insert into
      tbl_board_common
      (
        bc_title,
        bc_description,
        b_no,
        u_no
      )
      values
      (
        :bc_title,
        :bc_description,
        :b_no,
        :u_no
      )
    `;

    return q;
  }

  updatePost() {
    const q =`
      update
      tbl_board_common
      set
        bc_title = :bc_title,
        bc_description = :bc_description
      where
        bc_no = :bc_no
    `;

    return q;
  }

  deletePost() {
    const q =`
      delete
      from
        tbl_board_common
      where
        bc_no = :bc_no
    `;

    return q;
  }
}
