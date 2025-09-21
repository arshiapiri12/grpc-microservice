import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/** ورودی جستجوی فروشگاه */
export class ShopFindDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly size?: number;
}
