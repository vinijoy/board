import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqRemoveBoardDto {
  @ApiProperty({ description: '게시판 인덱스' })
  @IsNumber()
  @Type(() => Number)
  b_no: number;
}
