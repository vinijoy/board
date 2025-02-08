import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqRemovePostDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  @Type(() => Number)
  bc_no: number;
}
