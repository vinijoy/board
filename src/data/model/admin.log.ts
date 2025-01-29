import { ADMIN_LOG_TYPE } from '../enum';

export class AdminLog {
  al_no: number;
  al_type: ADMIN_LOG_TYPE;
  al_screen: string;
  al_data: string;
  al_ip: string;
  al_reg_dt: string;

  a_no: number;
}
