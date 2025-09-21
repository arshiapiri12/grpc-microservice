import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UploadRo {
  @Expose()
  @IsString()
  public readonly url: string;
}
