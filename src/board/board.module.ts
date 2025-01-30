import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardQuery } from './board.query';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardQuery, BoardService]
})
export class BoardModule {}
