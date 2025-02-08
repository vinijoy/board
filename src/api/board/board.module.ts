import { Module } from '@nestjs/common';
import { ApiBoardController } from './board.controller';
import { BoardQuery } from './board.query';
import { BoardService } from './board.service';

@Module({
  controllers: [ApiBoardController],
  providers: [BoardService, BoardQuery],
})
export class ApiBoardModule {}
