import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  GRPCError,
  HttpExceptionBuilder,
} from 'src/utils/http-exception-builder.utils';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

/** تبدیل کننده ارور‌های
 * RPC
 * به ارور‌های
 * http
 */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  private readonly httpExceptionBuilder = new HttpExceptionBuilder();

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: GRPCError) => {
        this.logger.error(err);
        if (!err.code) {
          return throwError(() => err);
        }
        return throwError(() =>
          this.httpExceptionBuilder.convert(err as GRPCError),
        );
      }),
    );
  }
}
