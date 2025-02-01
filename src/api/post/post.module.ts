import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiPostController } from './post.controller';
import { PostQuery } from './post.query';
import { PostService } from './post.service';

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
  controllers: [ApiPostController],
  providers: [PostService, PostQuery],
})
export class ApiPostModule {}
