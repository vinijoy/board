import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardQuery {
  selectAdminById() {
    const q = `
      SELECT
        a.a_no
        ,a.a_id
        ,a.a_is_super
        ,a.a_type
      FROM
        tbl_admin AS a
      WHERE
        a.a_id = :a_id
    `;

    return q;
  }

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
