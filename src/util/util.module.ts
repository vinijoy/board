import { Global, Module } from '@nestjs/common';
import { GeneralUtil } from './general.util';
import { MysqlUtil } from './mysql.util';

@Global()
@Module({
  providers: [GeneralUtil, MysqlUtil],
  exports: [GeneralUtil, MysqlUtil],
})
export class UtilModule {}
