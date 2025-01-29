import {
  Body,
  Controller,
  Post,
  Request
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CommonDto } from 'src/dto/common';
import { ReqCreateBoardDto } from 'src/dto/board/create.board';
import { RESPONSE_CODE } from 'src/data/enum';

@Controller('api/board')
@ApiTags('board')
export class ApiBoardController {
  constructor(private service: BoardService) {}

  @Post('create-board')
  @ApiOperation({ description: '게시판 생성' })
  @ApiOkResponse({ description: '게시판 생성 처리 성공 상태', type: String })
  async createBoard(@Request() req, @Body() data: ReqCreateBoardDto) {
    await this.service.createBoard(data);

    return new CommonDto(RESPONSE_CODE.SUCCESS);
  }
}
