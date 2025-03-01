import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from '../logger/logger.service';
import { ErrorResponse } from './error-response.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal Server Error';
    const stackTrace: string | undefined = (exception as Error)?.stack || 'No stack trace';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      // Verifica se responseBody é um objeto e possui a propriedade message
      if (typeof responseBody === 'object' && responseBody !== null) {
        const errorResponse = responseBody as ErrorResponse;
        message = Array.isArray(errorResponse.message)
          ? errorResponse.message.join(', ')
          : errorResponse.message || message;
      } else {
        message = responseBody;
      }
    }

    this.logger.error({
      level: 'error',
      message: 'HTTP Error',
      timestamp: new Date().toISOString(),
      statusCode: status,
      method: request.method,
      path: request.url,
      errorMessage: message,
      stack: stackTrace.split('\n'),
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
