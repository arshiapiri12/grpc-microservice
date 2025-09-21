import { MongooseModule } from '@nestjs/mongoose';
import { ShopsService } from './shop.service';
import { Module } from '@nestjs/common';
import { ShopsController } from './shop.controller';
import { configService } from 'src/config.service';
import { Shop, ShopSchema } from './schema/shops.schema';

@Module({
  imports: [
    MongooseModule.forRoot(configService.getMongoUri()),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  providers: [ShopsService],
  controllers: [ShopsController],
})
export class ShopsModule {}
