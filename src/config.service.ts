import * as dotenv from 'dotenv';
import { winstonConsole } from './factory/winston.config';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
dotenv.config();

/** کلاس بارگذار پیکره بندی اولیه ماژول‌های استفاده شده در زیرسیستم */
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return +this.getValue('HTTP_PORT', true);
  }

  private getGrpcConfig(
    name: string,
    url: string,
    protoPackage: string,
    protoPath: string,
  ): ClientProviderOptions {
    return {
      name,
      transport: Transport.GRPC,
      options: {
        url,
        package: protoPackage,
        protoPath,
        keepalive: {
          // send keepalive ping every 20 second, default is 2 hours
          keepaliveTimeMs: 20000,
          // keepalive ping time out after 5 seconds, default is 20 seconds
          keepaliveTimeoutMs: 5000,
          // allow keepalive pings when there's no gRPC calls
          keepalivePermitWithoutCalls: 1,
          // allow unlimited amount of keepalive pings without data
          http2MaxPingsWithoutData: 0,
          // allow grpc pings from client every 15 seconds
          http2MinTimeBetweenPingsMs: 15000,
          // allow grpc pings from client without data every 80 seconds
          http2MinPingIntervalWithoutDataMs: 80000,
          // http2MaxPingStrikes: 0,
        },
        loader: {
          longs: Number,
          arrays: true,
          oneofs: true,
        },
      },
    };
  }

  public getShopMicroGrpcConfig() {
    return this.getGrpcConfig(
      'SHOP_MICRO',
      this.getValue('SHOP_MICRO_URL', true),
      'shops',
      join(__dirname, '../src/protos/shops.proto'),
    );
  }

  public getMongoUri(): string {
    const user = this.getValue('MONGO_USER');
    const pass = this.getValue('MONGO_PASS');
    const host = this.getValue('MONGO_HOST');
    const port = this.getValue('MONGO_PORT');
    const db = this.getValue('MONGO_DB');

    console.log(
      `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`,
    );

    return `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;
  }

  public getWinstonConfig() {
    return winstonConsole();
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'HTTP_PORT',
  'MONGO_HOST',
  'MONGO_PORT',
  'MONGO_USER',
  'MONGO_PASS',
  'MONGO_DB',
]);

export { configService };
