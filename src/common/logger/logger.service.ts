import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  private readonly logLevels: string[];

  constructor() {
    this.logLevels = process.env.LOG_LEVELS
      ? process.env.LOG_LEVELS.split(',').map((level) => level.trim())
      : ['warn', 'error'];

    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logger = winston.createLogger({
      level: this.logLevels[0],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${String(timestamp)}] [${String(level).toUpperCase()}]: ${
            typeof message === 'string'
              ? message
              : message instanceof Error
                ? message.stack || message.message
                : JSON.stringify(message, null, 2)
          }`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          level: this.logLevels[0],
        }),
        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          level: this.logLevels.includes('error') ? 'error' : this.logLevels[0],
          handleExceptions: true,
          maxsize: 5 * 1024 * 1024,
          maxFiles: 5,
        }),
      ],
    });
  }

  log(message: string) {
    if (this.logLevels.includes('log')) {
      this.logger.info(message);
    }
  }

  warn(message: string) {
    if (this.logLevels.includes('warn')) {
      this.logger.warn(message);
    }
  }

  error(message: string | object, trace?: string) {
    const logMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2);

    if (trace) {
      this.logger.error(`[STACK TRACE]: ${trace}\n${logMessage}`);
    } else {
      this.logger.error(logMessage);
    }
  }

  debug(message: string) {
    if (this.logLevels.includes('debug')) {
      this.logger.debug(message);
    }
  }

  verbose(message: string) {
    if (this.logLevels.includes('verbose')) {
      this.logger.verbose(message);
    }
  }
}
