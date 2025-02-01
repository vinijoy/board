import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqRemovePostDto {
  @ApiProperty({ description: '게시물 번호' })
  @IsNumber()
  bc_no: number;
}
