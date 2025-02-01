import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqModifyBoardDto {
  @ApiProperty({ description: '게시판 인덱스' })
  @IsNumber()
  b_no: number;

  @ApiProperty({ description: '게시판 이름' })
  @IsString()
  b_name: string;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  b_id: string;
}
