import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 400) {
      response.status(status).json({
        statusCode: status,
        message: '잘못된 요청입니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 401) {
      response.status(status).json({
        statusCode: status,
        message: '인증이 필요합니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 403) {
      response.status(status).json({
        statusCode: status,
        message: '접근이 금지되었습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 404) {
      response.status(status).json({
        statusCode: status,
        message: '요청하신 페이지를 찾을 수 없습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 405) {
      response.status(status).json({
        statusCode: status,
        message: '허용되지 않는 메서드입니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 500) {
      response.status(status).json({
        statusCode: status,
        message: '서버 내부 오류가 발생했습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }
  }
}
