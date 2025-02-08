import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { MysqlUtil } from 'src/util/mysql.util';
import { AuthQuery } from './auth.query';
import { ReqCreateUserDto } from 'src/dto/user/create.user';
import { ReqSigninUserDto } from 'src/dto/user/read.user';
import { UserInfo } from 'src/data/model/user.info';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private mysql: MysqlUtil, private query: AuthQuery) {}

  async createUser(data: ReqCreateUserDto) {
    let userData = {};

    try {
      const hashedPassword = await this.hashPassword(data.user_pwd);
      userData = { ...data, user_pwd: hashedPassword };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('패스워드 해쉬 시도 중 서버에 문제가 발생했습니다.');
    }

    try {
      const insertUser = this.query.insertUser();
      await this.mysql.queryOne(insertUser, userData);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미 존재하는 아이디입니다.');
    }
  }

  async signinUser(data: ReqSigninUserDto) {
    const { user_id, user_pwd } = data;
    let user;
    try {
      const selectUserInfo = this.query.selectUserInfo();
      user =       await this.mysql.queryOne(selectUserInfo, { user_id: user_id }) as UserInfo[];
    } catch (error) {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }

    try {
      if (user) {
        const isMatch = await bcrypt.compare(user_pwd, user[0].u_pwd);
        if (isMatch) {
          const payload = { user_id };
          const accessToken = await this.createToken(payload);
          return { accessToken: accessToken };
        }
      }
    } catch (error) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    throw new UnauthorizedException('로그인 정보가 올바르지 않습니다.');
  }


  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async createToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
