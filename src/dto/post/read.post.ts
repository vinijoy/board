import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqReadPostListDto {
  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  @Type(() => String)
  b_id: string;

  @ApiProperty({ description: '검색어' })
  @IsString()
  @Type(() => String)
  keyword?: string;
}

export class ReqReadPostInfoDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  @Type(() => Number)
  bc_no: number;

  @ApiProperty({ description: '게시판 식별자' })
  @IsString()
  @Type(() => String)
  b_id: string;
}
