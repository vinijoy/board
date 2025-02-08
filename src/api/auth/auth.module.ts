import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiAuthController } from './auth.controller';
import { AuthQuery } from './auth.query';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: `process.env.SECRET_KEY`,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [ApiAuthController],
  providers: [AuthService, AuthQuery],
})
export class ApiAuthModule {}
