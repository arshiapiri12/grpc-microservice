import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { ShopRo } from './shop.ro';

/** خروجی لیست فروشگاه ها */
export class ShopsRo {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShopRo)
  public readonly shopsRo: ShopRo[];

  @Expose()
  @IsNumber()
  public readonly count: number;
}
