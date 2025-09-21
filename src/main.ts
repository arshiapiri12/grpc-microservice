import { configService } from 'src/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
// import { AppGateway } from './Interaction/direct/direct.geteway';

async function bootstrap() {
  const winstonLogger = WinstonModule.createLogger(
    configService.getWinstonConfig(),
  );

  const grpcApp = await NestFactory.createMicroservice(AppModule, {
    ...configService.getShopMicroGrpcConfig(),
    logger: winstonLogger,
  });

  grpcApp.useLogger(grpcApp.get(WINSTON_MODULE_NEST_PROVIDER));

  grpcApp.useGlobalPipes(new ValidationPipe({ transform: true }));

  await grpcApp.listen();

  winstonLogger.log('shop micro is listening...');
}

bootstrap();
