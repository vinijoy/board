import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GeneralUtil } from 'src/util/general.util';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class AdminAuthAccessStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private util: GeneralUtil, private service: BoardService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const bearer = request?.headers['authorization-admin']?.toString()?.split(' ');

          if (bearer && bearer[0] === 'Bearer') {
            return bearer[1];
          } else if (request.cookies['access-token']) {
            return request.cookies['access-token'];
          }

          return '';
        },
      ]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.SECURE_JWT_KEY,
    });
  }

  async validate(req, payload: any) {
    if (!payload?.data) {
      throw new UnauthorizedException();
    } else if (new Date().getTime() > payload.exp * 1000) {
      throw new UnauthorizedException();
    }

    const data = JSON.parse(this.util.decryptAES(payload.data));

    // 관리자 타입에 따른 필터링
    const adminType =  await this.service.getAdminTypeById(data.a_id);

    return {
      a_id: data.a_id,
      a_type: adminType,
    };
  }
}
