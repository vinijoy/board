import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReqCreateBoardDto {
  @ApiProperty({ description: '게시판 이름' })
  @IsString()
  b_name: string;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  b_id: string;
}
