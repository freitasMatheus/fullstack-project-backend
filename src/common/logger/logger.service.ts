import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: object) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
