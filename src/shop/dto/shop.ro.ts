import { ShopTemplate } from '../enum/shop-template';
import { ShopStatus } from '../enum/shop-status';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';

export class ShopRo {
  @Expose()
  @Type(() => String)
  public readonly id: string;

  @Expose()
  @Type(() => String)
  public readonly owner: string;

  @Expose()
  public readonly username: string;
  @Expose()
  public readonly status: ShopStatus;

  @IsString()
  @Expose()
  public readonly name: string;

  @ValidateNested({
    each: true,
  })
  @Expose()
  @IsEnum(ShopTemplate)
  public readonly template: ShopTemplate;

  @IsString()
  @Expose()
  public readonly image?: string;

  @IsString()
  @Expose()
  public readonly cover?: string;

  @IsString()
  @Expose()
  public readonly description?: string;

  @IsString()
  @Expose()
  public readonly tags?: string[];
}
