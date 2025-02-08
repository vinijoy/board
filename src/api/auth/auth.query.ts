import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthQuery {
  selectExistUserCount () {
    const q = `
      select
        u_id
      from
        tbl_user
      where
        u_id = :user_id
    `;

    return q;
  }

  insertUser() {
    const q = `
      insert into
      tbl_user
      (
        u_id,
        u_pwd
      )
      values
      (
        :user_id,
        :user_pwd
      )
    `;

    return q;
  }

  selectUserInfo() {
    const q = `
      select
        u_id,
        u_pwd
      from
        tbl_user
      where
        u_id = :user_id
    `;

    return q;
  }
}
