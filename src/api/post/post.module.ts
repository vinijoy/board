import { Module } from '@nestjs/common';
import { ApiPostController } from './post.controller';
import { PostQuery } from './post.query';
import { PostService } from './post.service';

@Module({
  controllers: [ApiPostController],
  providers: [PostService, PostQuery],
})
export class ApiPostModule {}
