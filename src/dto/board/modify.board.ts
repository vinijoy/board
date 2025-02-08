import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqModifyBoardDto {
  @ApiProperty({ description: '게시판 인덱스' })
  @IsNumber()
  @Type(() => Number)
  b_no: number;

  @ApiProperty({ description: '게시판 이름' })
  @IsString()
  @Type(() => String)
  b_name: string;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  @Type(() => String)
  b_id: string;
}
