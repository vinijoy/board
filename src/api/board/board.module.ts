import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiBoardController } from './board.controller';
import { BoardQuery } from './board.query';
import { BoardService } from './board.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECURE_JWT_KEY'),
      }),
    }),
  ],
  controllers: [ApiBoardController],
  providers: [BoardService, BoardQuery],
})
export class ApiBoardModule {}
