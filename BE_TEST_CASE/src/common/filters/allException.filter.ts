import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const baseResponseBuilder: { timestap: string; path: string } = {
      timestap: new Date().toISOString(),
      path: request.url,
    };

    console.log(exception);

    if (exception instanceof HttpException) {
      const responseException = exception.getResponse();
      const status = exception.getStatus();
      const statusCode = status ? status : 500;

      const buildResponse =
        typeof responseException === 'object'
          ? { ...responseException }
          : {
              message: exception.message,
              statusCode,
            };

      const finalResponse = {
        ...baseResponseBuilder,
        ...buildResponse,
      };

      return response.status(statusCode).json(finalResponse);
    }

    return response.status(500).json({
      message: 'Internal Server Error',
      ...baseResponseBuilder,
    });
  }
}
