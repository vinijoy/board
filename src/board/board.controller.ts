import { Controller, Get, Render, Request, Query } from '@nestjs/common';
import { GeneralUtil } from 'src/util/general.util';
import { BoardService } from './board.service';
import { ReqReadBoardInfoDto } from 'src/dto/board/read.board';
import { ReqReadPostListDto } from 'src/dto/post/read.post';
import { ReqReadPostInfoDto } from 'src/dto/post/read.post';
import { ReqWritePostDto } from 'src/dto/post/create.post';

@Controller('')
export class BoardController {
  constructor(private util: GeneralUtil, private service: BoardService) {}

/*
타입 유효성 체크는 전역에서 처리하도록 하고 제출했는데 문제가 생겨 해결했습니다. 죄송합니다.
또한 로그인 기능이 아직 없어 권한에 대한 가드 및 필터는 적용되지 않은 상태입니다.
로그인 기능이 없는 상태라 현재는 사용자를 식별하는 값을 하드코딩해서 전달되도록 하였습니다.
*/

  @Get()
  @Render('index.ejs')
  async index(@Request() req) {
    const board_list = await this.service.getBoardList();

    return {
      board_list: board_list,
      ...this.getCommonData(req)
    };
  }

  @Get('join')
  @Render('join.ejs')
  join(@Request() req) {
    return {
      ...this.getCommonData(req)
    };
  }

  @Get('login')
  @Render('login.ejs')
  login(@Request() req) {
    return {
      ...this.getCommonData(req)
    };
  }

  @Get('board_manage')
  @Render('board_manage.ejs')
  async manageBoard(@Request() req) {
    const board_list = await this.service.getBoardList();

    return {
      board_list: board_list,
      ...this.getCommonData(req)
    };
  }

  @Get('board_update')
  @Render('board_update.ejs')
  async updateBoard(@Request() req, @Query() data: ReqReadBoardInfoDto) {
    const board_list = await this.service.getBoardList();
    const board_info = await this.service.getBoardInfo(data);

    return {
      board_list: board_list,
      board_info: board_info,
      ...this.getCommonData(req)
    };
  }

  @Get('board')
  @Render('board.ejs')
  async readBoard(@Request() req, @Query() data: ReqReadPostListDto) {
    const { b_id } = data;
    const board_list = await this.service.getBoardList();
    const board_name = await this.service.getBoardName(b_id);
    const board_no = await this.service.getBoardNo(b_id);
    const post_count = await this.service.getPostCount(data);
    const post_list = await this.service.getPostList(data);

    return {
      board_list: board_list,
      board_name: board_name,
      board_no: board_no,
      b_id: b_id,
      post_count: post_count,
      post_list: post_list,
      ...this.getCommonData(req)
    };
  }

  @Get('post_write')
  @Render('post_write.ejs')
  async writeBoard(@Request() req, @Query() data: ReqWritePostDto) {
    const { b_no, b_id, u_no } = data;
    const board_list = await this.service.getBoardList();
    const board_name = await this.service.getBoardName(b_id);
    return {
      board_list: board_list,
      board_name: board_name,
      b_no: b_no,
      b_id: b_id,
      u_no: u_no,
      ...this.getCommonData(req)
    };
  }

  @Get('post')
  @Render('post.ejs')
  async readPost(@Request() req, @Query() data: ReqReadPostInfoDto) {
    const { bc_no, b_id } = data;
    const board_list = await this.service.getBoardList();
    const board_name = await this.service.getBoardName(b_id);
    const post_info = await this.service.getPostInfo(bc_no);

    return {
      board_list: board_list,
      board_name: board_name,
      bc_no: bc_no,
      b_id: b_id,
      post_info: post_info,
      ...this.getCommonData(req)
    };
  }

  @Get('post_update')
  @Render('post_update.ejs')
  async updatePost(@Request() req, @Query() data: ReqReadPostInfoDto) {
    const { bc_no, b_id } = data;
    const board_list = await this.service.getBoardList();
    const board_name = await this.service.getBoardName(b_id);
    const post_info = await this.service.getPostInfo(bc_no);

    return {
      board_list: board_list,
      board_name: board_name,
      bc_no: bc_no,
      b_id: b_id,
      post_info: post_info,
      ...this.getCommonData(req)
    };
  }


  getCommonData(req: any) {
    return {
      url: req.originalUrl,
      referer: req?.headers?.referer || '',
      numberWithCommas: (x) => {
        if (!x) {
          return 0;
        }

        return x
          .toString()
          .replace(/,/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      numberPad: (x: number) => {
        if (x < 10) {
          return `0${x}`;
        }

        return x.toString();
      },
      randomVersion: this.util.uuid(),
    };
  }
}
