import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MysqlUtil } from 'src/util/mysql.util';
import { PostQuery } from './post.query';
import { ReqCreatePostDto } from 'src/dto/post/create.post';
import { ReqModifyPostDto } from 'src/dto/post/modify.post';
import { ReqRemovePostDto } from 'src/dto/post/remove.post';

@Injectable()
export class PostService {
  constructor(private mysql: MysqlUtil, private query: PostQuery) {}

  async createPost(data: ReqCreatePostDto) {
    try {
      const insertPost = this.query.insertPost();
      await this.mysql.queryOne(insertPost, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('insert 시도 중 서버에 문제가 발생했습니다.');
    }
  }

  async modifyPost(data: ReqModifyPostDto) {
    try {
      const updatePost = this.query.updatePost();
      await this.mysql.queryOne(updatePost, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('update 시도 중 서버에 문제가 발생했습니다.');
    }
  }

  async removePost(data: ReqRemovePostDto) {
    try {
      const deletePost = this.query.deletePost();
      await this.mysql.queryOne(deletePost, data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('delete 시도 중 서버에 문제가 발생했습니다.');
    }
  }
}
