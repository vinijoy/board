import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqSigninUserDto {
  @ApiProperty({ description: '사용자 아이디' })
  @IsString()
  @Type(() => String)
  user_id: string;

  @ApiProperty({ description: '사용자 패스워드' })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: '비밀번호는 영문, 숫자, 특수문자 혼합 최소 8자여야 합니다.',
  })
  @Type(() => String)
  user_pwd: string;
}
