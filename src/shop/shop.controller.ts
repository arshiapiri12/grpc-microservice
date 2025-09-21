import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopFindDto } from './dto/shop-find.dto';
import { ShopsService } from './shop.service';
import { IDDto } from 'src/commons/dto/uuid.dto';
import { ShopRo } from './dto/shop.ro';
import { ShopsRo } from './dto/shops.ro';
import { UploadRo } from './dto/upload-file.ro';
import { UploadFileDto } from './dto/upload-file.dto';
import { DownloadRo } from './dto/download.ro';
import { DownloadDto } from './dto/download.dto';

@Controller()
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @GrpcMethod('ShopsService', 'create')
  async create(createShopDto: CreateShopDto): Promise<ShopRo> {
    return await this.shopsService.create(createShopDto);
  }

  @GrpcMethod('ShopsService', 'update')
  async update(updateShopDto: UpdateShopDto): Promise<void> {
    await this.shopsService.update(updateShopDto);
  }

  @GrpcMethod('ShopsService', 'find')
  async find(shopFindDto: ShopFindDto): Promise<ShopsRo> {
    return await this.shopsService.find(shopFindDto);
  }

  @GrpcMethod('ShopsService', 'get')
  async get(idDto: IDDto): Promise<ShopRo> {
    return await this.shopsService.get(idDto);
  }

  @GrpcMethod('ShopsService', 'delete')
  async delete(idDto: IDDto): Promise<void> {
    await this.shopsService.delete(idDto);
  }

  @GrpcMethod('ShopsService', 'uploadFile')
  async uploadFile(uploadFileDto: UploadFileDto): Promise<UploadRo> {
    return await this.shopsService.uploadFile(uploadFileDto);
  }

  @GrpcMethod('ShopsService', 'download')
  async download(downloadDto: DownloadDto): Promise<DownloadRo> {
    return await this.shopsService.download(downloadDto);
  }
}
