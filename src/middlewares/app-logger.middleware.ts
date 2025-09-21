import { Injectable, NestMiddleware, Inject } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
/** لاگ کننده ارتباطات برقرار شده */
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, body } = request;
    const userAgent = request.get('user-agent') || '';
    const start = new Date().getMilliseconds();

    response.on('close', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');
      this.logger.http(
        `${request.route?.path}
        (${method}) => ${statusCode} - ${userAgent} ${ip} - ${
          new Date().getMilliseconds() - start
        }ms `,
        { body },
      );
    });

    next();
  }
}
