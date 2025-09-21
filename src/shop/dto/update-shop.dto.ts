
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ShopTemplate } from '../enum/shop-template';

export class UpdateShopDto {
  @IsOptional()
  public readonly id?: string; //NOTE - fill from para
  @IsString()
  @IsOptional()
  public readonly name?: string
  @IsString()
  @IsOptional()
  public readonly image?: string
  @IsString()
  @IsOptional()
  public readonly cover?: string
  @IsEnum(ShopTemplate)
  @IsOptional()
  public readonly template?: ShopTemplate;

  @IsString()
  @IsOptional()
  public readonly description?: string
  @IsArray()
  @IsOptional()
  public readonly tags?: string[];
}

