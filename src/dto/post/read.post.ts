import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqReadPostListDto {
  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  b_id: string;

  @ApiProperty({ description: '검색어' })
  @IsString()
  keyword: string;
}

export class ReqReadPostInfoDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  bc_no: number;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  b_id: string;
}
