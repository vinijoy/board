import { ADMIN_TYPE, NY_TYPE } from '../enum';
import { AdminLog } from './admin.log';

export class Admin {
  a_no: number;
  a_id: string;
  a_pw: string;
  a_is_super: NY_TYPE;
  a_type: ADMIN_TYPE;

  org_name?: string;

  str_log?: string;
  log_list?: Partial<AdminLog>[];
}
