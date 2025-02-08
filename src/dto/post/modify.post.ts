import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqModifyPostDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  @Type(() => Number)
  bc_no: number;

  @ApiProperty({ description: '게시물 제목' })
  @IsString()
  @Type(() => String)
  bc_title: string;

  @ApiProperty({ description: '게시물 내용' })
  @IsString()
  @Type(() => String)
  bc_description: string;
}
