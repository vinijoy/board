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
      const responseBody: any = exception.getResponse();

      let errorMessage;
      if (typeof responseBody === 'object' && responseBody.message) {
        errorMessage =
          Array.isArray(responseBody.message)
            ? responseBody.message.join(', ')
            : responseBody.message;
      } else {
        errorMessage = '타입 에러가 발생했습니다.';
      }

      response.status(status).json({
        statusCode: status,
        message: errorMessage,
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
        message: '요청하신 URL을 찾을 수 없습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 405) {
      response.status(status).json({
        statusCode: status,
        message: '요청하신 메서드는 해당 리소스에서 사용할 수 없습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (status === 500) {
      const errorMessage = exception.message || '서버 내부 오류가 발생했습니다.';

      response.status(status).json({
        statusCode: status,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    response.status(status).json({
      statusCode: status,
      message: '오류가 발생했습니다.',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
