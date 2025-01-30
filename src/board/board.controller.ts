import { Controller, Get, Render, Request, Query, UseFilters, UseGuards } from '@nestjs/common';

@Controller('')
export class BoardController {

  @Get()
  @Render('index.ejs')
  async index() {
    return {
    };
  }

  @Get('board_manage')
  @Render('board_manage.ejs')
  async manageBoard() {
    return {
    };
  }
}
