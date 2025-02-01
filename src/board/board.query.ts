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

  selectBoardInfo() {
    const q = `
      select
        b_no,
        b_name,
        b_id
      from
        tbl_board_list
      where
        b_no = :b_no
    `;

    return q;
  }

  selectBoardName() {
    const q = `
      select
        b_name
      from
        tbl_board_list
      where
        b_id = :b_id
    `;

    return q;
  }

  selectPostList() {
    const q = `
      select
        bc.bc_no,
        bc.bc_title
      from
        tbl_board_list as b
      left join
        tbl_board_common as bc
      on
        b.b_no = bc.b_no
      left join
        tbl_user as u
      on
        bc.u_no = u.u_no
      where
        b.b_id = :b_id
      and
        bc.u_no = :u_no
      order by
        bc.bc_no desc
    `;

    return q;
  }

  selectBoardNo() {
    const q = `
      select
        b_no
      from
        tbl_board_list
      where
        b_id = :b_id
    `;

    return q;
  }

  selectPostInfo() {
    const q = `
      select
        bc_title,
        bc_description
      from
        tbl_board_common
      where
        bc_no = :bc_no
    `;

    return q;
  }
}
