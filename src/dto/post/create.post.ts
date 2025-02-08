import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqWritePostDto {
  @ApiProperty({ description: '게시판 번호' })
  @IsNumber()
  @Type(() => Number)
  b_no: number;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  @Type(() => String)
  b_id: string;

  @ApiProperty({ description: '사용자 번호' })
  @IsNumber()
  @Type(() => Number)
  u_no: number;
}

export class ReqCreatePostDto {
  @ApiProperty({ description: '게시물 제목' })
  @IsString()
  @Type(() => String)
  bc_title: string;

  @ApiProperty({ description: '게시물 내용' })
  @IsString()
  @Type(() => String)
  bc_description: string;

  @ApiProperty({ description: '게시판 번호' })
  @IsNumber()
  @Type(() => Number)
  b_no: number;

  @ApiProperty({ description: '사용자 번호' })
  @IsNumber()
  @Type(() => Number)
  u_no: number;
}
