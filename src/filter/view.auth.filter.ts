import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { ADMIN_TYPE } from 'src/data/enum';

@Catch(UnauthorizedException)
export class ViewAuthFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const user = request.user;

    if (user && user.a_type === ADMIN_TYPE.COMPANY_USER) {
      response.redirect(302, '/board/');
    }

    response.redirect(302, '/board/login');
  }
}
