import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardQuery } from './board.query';
import { BoardService } from './board.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminAuthAccessStrategy } from 'src/strategy/admin.auth.access.strategy';

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
  controllers: [BoardController],
  providers: [BoardQuery, BoardService, AdminAuthAccessStrategy]
})
export class BoardModule {}
