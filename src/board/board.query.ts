import { Injectable } from '@nestjs/common';
import { ReqReadPostListDto } from 'src/dto/post/read.post';

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

  selectPostCount(data: ReqReadPostListDto) {
    const q = `
      select
        count(bc_no) as bc_count
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
        ${data.keyword ? `and (bc.bc_title like concat('%', :keyword, '%') or bc.bc_description like concat('%', :keyword, '%'))` : ''}
    `;

    return q;
  }

  selectPostList(data: ReqReadPostListDto) {
    const q = `
      select
        bc.bc_no,
        bc.bc_title,
        bc.bc_create_dt,
        u.u_id
      from
        tbl_board_list as b
      inner join
        tbl_board_common as bc
      on
        b.b_no = bc.b_no
      left join
        tbl_user as u
      on
        bc.u_no = u.u_no
      where
        b.b_id = :b_id
        ${data.keyword ? `and (bc.bc_title like concat('%', :keyword, '%') or bc.bc_description like concat('%', :keyword, '%'))` : ''}
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
        bc.bc_title,
        bc.bc_description,
        bc.bc_create_dt,
        bc.bc_update_dt,
        u.u_id
      from
        tbl_board_common as bc
      left join
        tbl_user as u
      on
        bc.u_no = u.u_no
      where
        bc.bc_no = :bc_no
    `;

    return q;
  }
}
