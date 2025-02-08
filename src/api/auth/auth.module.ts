import { Module } from '@nestjs/common';
import { ApiAuthController } from './auth.controller';
import { AuthQuery } from './auth.query';
import { AuthService } from './auth.service';

@Module({
  controllers: [ApiAuthController],
  providers: [AuthService, AuthQuery],
})
export class ApiAuthModule {}
