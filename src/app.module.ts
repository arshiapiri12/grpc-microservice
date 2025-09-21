import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { configService } from './config.service';
import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';
import { ShopsModule } from './shop/shops.module';

@Module({
  imports: [
    WinstonModule.forRoot(configService.getWinstonConfig()),
    ShopsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
