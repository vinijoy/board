import {
  Body,
  Controller,
  Delete,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CommonDto } from 'src/dto/common';
import { RESPONSE_CODE } from 'src/data/enum';
import { ReqCreatePostDto } from 'src/dto/post/create.post';
import { ReqModifyPostDto } from 'src/dto/post/modify.post';
import { ReqRemovePostDto } from 'src/dto/post/remove.post';

@Controller('api/post')
@ApiTags('post')
export class ApiPostController {
  constructor(private service: PostService) {}

  @Post('create-post')
  @ApiOperation({ description: '게시물 생성' })
  @ApiOkResponse({ description: '게시물 생성 처리 성공 상태', type: String })
  async createPost(@Body() data: ReqCreatePostDto) {
    await this.service.createPost(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }

  @Patch('modify-post')
  @ApiOperation({ description: '게시물 수정' })
  @ApiOkResponse({ description: '게시물 수정 처리 성공 상태', type: String })
  async modifyPost(@Body() data: ReqModifyPostDto) {
    await this.service.modifyPost(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }

  @Delete('remove-post')
  @ApiOperation({ description: '게시물 삭제' })
  @ApiOkResponse({ description: '게시물 삭제 처리 성공 상태', type: String })
  async removePost(@Body() data: ReqRemovePostDto) {
    await this.service.removePost(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }
}
