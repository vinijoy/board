import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE } from 'src/data/enum';

export class CommonDto<T> {
  constructor(resultData: T, resultCode: RESPONSE_CODE = RESPONSE_CODE.SUCCESS) {
    this.result_data = resultData;
    this.result_code = resultCode;
  }

  @ApiProperty({ description: '응답 코드' })
  result_code: RESPONSE_CODE;

  @ApiProperty({ description: '응답 데이터' })
  result_data: T;
}
