import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/config.env',
    }),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
