import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqCreateBoardDto {
  @ApiProperty({ description: '게시판 이름' })
  @IsString()
  @Type(() => String)
  b_name: string;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  @Type(() => String)
  b_id: string;
}
