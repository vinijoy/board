import { Controller, Get, Render, Request, Query, UseFilters, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { GeneralUtil } from 'src/util/general.util';

@Controller('')
export class BoardController {
  constructor(private util: GeneralUtil, private service: BoardService) {}

  @Get()
  @Render('index.ejs')
  async index(@Request() req) {
    const board_list = await this.service.getBoardList();

    return {
      board_list: board_list,
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
