import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PoolConnection, RowDataPacket } from 'mysql2';
import { JwtService } from '@nestjs/jwt';
import { GeneralUtil } from 'src/util/general.util';
import { MysqlUtil } from 'src/util/mysql.util';
import { PostQuery } from './post.query';
import { COMMON_CODE, COMMON_CODE_GROUP } from 'src/data/constant';
import { CommonCode } from 'src/data/model/common.code';
import { ReqCreatePostDto } from 'src/dto/post/create.post';
import { ReqModifyPostDto } from 'src/dto/post/modify.post';
import { ReqRemovePostDto } from 'src/dto/post/remove.post';

@Injectable()
export class PostService {
  constructor(private jwtService: JwtService, private mysql: MysqlUtil, private query: PostQuery, private util: GeneralUtil) {}

  async createPost(data: ReqCreatePostDto) {
    try {
      const insertPost = this.query.insertPost();
      await this.mysql.queryOne(insertPost, data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async modifyPost(data: ReqModifyPostDto) {
    try {
      const updatePost = this.query.updatePost();
      await this.mysql.queryOne(updatePost, data);
    } catch (error) {
      console.log(error);
    }
  }

  async removePost(data: ReqRemovePostDto) {
    try {
      const deletePost = this.query.deletePost();
      await this.mysql.queryOne(deletePost, data);
    } catch (error) {
      console.log(error);
    }
  }
}
