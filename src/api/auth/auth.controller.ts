import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CommonDto } from 'src/dto/common';
import { RESPONSE_CODE } from 'src/data/enum';
import { ReqCreateUserDto } from 'src/dto/user/create.user';
import { ReqSigninUserDto } from 'src/dto/user/read.user';

@Controller('api/auth')
@ApiTags('auth')
export class ApiAuthController {
  constructor(private service: AuthService) {}

/*
타입 유효성 체크는 전역에서 처리하도록 했습니다.
또한 모든 리턴 값을 success로 하고 에러가 발생한 경우에는 서비스 단에서 500 에러를 발생시키도록 하고 클라이언트에게 보여줄 에러 메시지를 커스텀하여 전달하도록 하였습니다.
*/

  @Post('signup')
  @ApiOperation({ description: '사용자 생성' })
  @ApiOkResponse({ description: '사용자 생성 처리 성공 상태', type: String })
  async createUser(@Body() data: ReqCreateUserDto) {
    await this.service.createUser(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }

  @Post('signin')
  @ApiOperation({ description: '사용자 로그인' })
  @ApiOkResponse({ description: '사용자 로그인 처리 성공 상태', type: String })
  async signinUser(@Body() data: ReqSigninUserDto) {

    const access_token = await this.service.signinUser(data);

    const result = [
      {
        access_token: access_token,
        result_code: new CommonDto(RESPONSE_CODE.SUCCESS)
      }
    ];

    return result;
  }
}
