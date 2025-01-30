import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
  ],
  controllers: [BoardController],
  providers: []
})
export class BoardModule {}
