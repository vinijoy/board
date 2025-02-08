import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiAuthModule } from './api/auth/auth.module';
import { ApiBoardModule } from './api/board/board.module';
import { ApiPostModule } from './api/post/post.module';
import { BoardModule } from './board/board.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./env/.${process.env.NODE_ENV}.env`],
    }),
    BoardModule,
    ApiAuthModule,
    ApiBoardModule,
    ApiPostModule,
    UtilModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
