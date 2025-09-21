import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ShopTemplate } from '../enum/shop-template';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly image?: string;

  @IsString()
  @IsOptional()
  public readonly cover?: string;

  @IsEnum(ShopTemplate)
  @IsOptional()
  public readonly template: ShopTemplate;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsArray()
  @IsOptional()
  public readonly tags?: string[];
}
