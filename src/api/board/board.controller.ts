import {
  Body,
  Controller,
  Delete,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CommonDto } from 'src/dto/common';
import { RESPONSE_CODE } from 'src/data/enum';
import { ReqCreateBoardDto } from 'src/dto/board/create.board';
import { ReqModifyBoardDto } from 'src/dto/board/modify.board';
import { ReqRemoveBoardDto } from 'src/dto/board/remove.board';

@Controller('api/board')
@ApiTags('board')
export class ApiBoardController {
  constructor(private service: BoardService) {}

  @Post('create-board')
  @ApiOperation({ description: '게시판 생성' })
  @ApiOkResponse({ description: '게시판 생성 처리 성공 상태', type: String })
  async createBoard(@Body() data: ReqCreateBoardDto) {
    await this.service.createBoard(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }

  @Patch('modify-board')
  @ApiOperation({ description: '게시판 수정' })
  @ApiOkResponse({ description: '게시판 수정 처리 성공 상태', type: String })
  async modifyBoard(@Body() data: ReqModifyBoardDto) {
    await this.service.modifyBoard(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }

  @Delete('remove-board')
  @ApiOperation({ description: '게시판 삭제' })
  @ApiOkResponse({ description: '게시판 삭제 처리 성공 상태', type: String })
  async removeBoard(@Body() data: ReqRemoveBoardDto) {
    await this.service.removeBoard(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }
}
