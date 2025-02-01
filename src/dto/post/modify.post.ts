import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqModifyPostDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  bc_no: number;

  @ApiProperty({ description: '게시물 제목' })
  @IsString()
  bc_title: string;

  @ApiProperty({ description: '게시물 내용' })
  @IsString()
  bc_description: string;
}
