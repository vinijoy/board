import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqReadBoardInfoDto {
  @ApiProperty({ description: '게시판 인덱스' })
  @IsNumber()
  b_no: number;
}
