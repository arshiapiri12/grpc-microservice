import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShopStatus } from '../enum/shop-status';
import { ShopTemplate } from '../enum/shop-template';

export type ShopDocument = Shop & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Shop {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  public owner: string; // NOTE - User ID

  @Prop({
    type: String,
    enum: Object.values(ShopStatus),
    default: ShopStatus.AWAITING_CONFIRMATION,
  })
  public status: ShopStatus;

  @Prop({
    type: String,
    enum: Object.values(ShopTemplate),
    default: ShopTemplate.LIGHT,
  })
  public template: ShopTemplate;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  public image?: string;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  public cover?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  public verified: boolean;

  @Prop({
    type: String,
    maxlength: 512,
    required: false,
  })
  public description?: string;

  @Prop({
    type: [String],
    required: false,
    default: [],
  })
  public tags?: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
