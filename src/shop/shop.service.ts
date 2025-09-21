import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopRo } from './dto/shop.ro';
import { plainToClass } from 'class-transformer';
import { ShopsRo } from './dto/shops.ro';
import { ShopFindDto } from './dto/shop-find.dto';
import { IDDto } from 'src/commons/dto/uuid.dto';
import { Shop } from './schema/shops.schema';
import { RpcException } from '@nestjs/microservices';
import { status as grpcStatus } from '@grpc/grpc-js';
import { UploadFileDto } from './dto/upload-file.dto';
import { join } from 'path';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { UploadRo } from './dto/upload-file.ro';
import { DownloadDto } from './dto/download.dto';
import { DownloadRo } from './dto/download.ro';
import { existsSync } from 'fs';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name)
    private readonly shopModel: Model<Shop>,
  ) {}

  async create(createShopDto: CreateShopDto): Promise<ShopRo> {
    const createdShop = new this.shopModel(createShopDto);
    const savedShop = await createdShop.save();
    return plainToClass(ShopRo, savedShop, { excludeExtraneousValues: true });
  }

  async find(shopFindDto: ShopFindDto): Promise<ShopsRo> {
    const { page = 1, size = 10 } = shopFindDto;

    const skip = (page - 1) * size;

    const [shopsData, count] = await Promise.all([
      this.shopModel.find({}).skip(skip).limit(size).sort({ createdAt: -1 }),
      this.shopModel.countDocuments(),
    ]);

    return plainToClass(
      ShopsRo,
      {
        shopsRo: shopsData,
        count,
      },
      { excludeExtraneousValues: true },
    );
  }

  async get(idDto: IDDto): Promise<ShopRo> {
    const { id } = idDto;

    const shop = await this.shopModel.findById(id);
    if (!shop) {
      throw new RpcException({
        code: grpcStatus.NOT_FOUND,
        message: `Shop with id ${id} not found`,
      });
    }

    return plainToClass(ShopRo, shop, {
      excludeExtraneousValues: true,
    });
  }

  async update(updateShopDto: UpdateShopDto): Promise<ShopRo> {
    const { id, ...updateData } = updateShopDto;

    const updatedShop = await this.shopModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedShop) {
      throw new RpcException({
        code: grpcStatus.NOT_FOUND,
        message: `Shop with id ${id} not found`,
      });
    }

    return plainToClass(ShopRo, updatedShop, {
      excludeExtraneousValues: true,
    });
  }

  async delete(idDto: IDDto): Promise<void> {
    const { id } = idDto;
    const result = await this.shopModel.findByIdAndDelete(id);

    if (!result) {
      throw new RpcException({
        code: grpcStatus.NOT_FOUND,
        message: `Shop with id ${id} not found`,
      });
    }
  }

  async uploadFile(uploadFileDto: UploadFileDto): Promise<UploadRo> {
    const { file } = uploadFileDto;

    const size = file.length;

    console.log('size---------->', size);
    const minSize = 10 * 1024;
    console.log('minSize---------->', minSize);
    const maxSize = 1 * 1024 * 1024;
    console.log('maxSize---------->', maxSize);

    if (size < minSize || size > maxSize) {
      throw new RpcException({
        code: grpcStatus.INVALID_ARGUMENT,
        message: `File size must be between 10KB and 1MB`,
      });
    }

    const uniqueName = `${uuidv4()}.png`;

    const uploadDir = join(__dirname, '../../uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, uniqueName);
    writeFile(filePath, file);

    return plainToClass(
      UploadRo,
      { url: `${uniqueName}` },
      { excludeExtraneousValues: true },
    );
  }

  async download(downloadDto: DownloadDto): Promise<DownloadRo> {
    const { url } = downloadDto;

    console.log('url-------->>', url);

    const filePath = join(__dirname, '../../uploads', url);

    console.log('filePath-------->>', filePath);

    if (!existsSync(filePath)) {
      console.log('asaassa');
      throw new RpcException({
        code: grpcStatus.NOT_FOUND,
        message: `File ${url} not found.`,
      });
    }

    try {
      const data = await readFile(filePath);

      console.log('data-------->>', data);

      return plainToClass(
        DownloadRo,
        { data },
        { excludeExtraneousValues: true },
      );
    } catch (err) {
      throw new RpcException({
        code: grpcStatus.NOT_FOUND,
        message: `File ${url} not found or cannot be read.`,
      });
    }
  }
}
