import { Controller, Get, Render, Request, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ViewAuthFilter } from 'src/filter/view.auth.filter';
import { AdminAccessGuard } from 'src/guard/admin.access.guard';
import { GeneralUtil } from 'src/util/general.util';
import { BoardQuery } from './board.query';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private util: GeneralUtil, private service: BoardService) {}

  @Get()
// @UseGuards(AdminAccessGuard)
@UseFilters(ViewAuthFilter)
  @Render('board.ejs')
  async index(@Request() req) {
    const board_list = await this.service.getBoardList();

    return {
      board_list: board_list,
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

  @Get('create')
  @Render('board_create.ejs')
  async createBoard(@Request() req) {
    const board_list = await this.service.getBoardList();

    return {
      board_list: board_list,
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
