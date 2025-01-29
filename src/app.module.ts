import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiBoardModule } from './api/board/board.module';
import { BoardModule } from './board/board.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/config.env',
    }),
    BoardModule,
    ApiBoardModule,
    UtilModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
