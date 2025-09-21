import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DownloadRo {
  @IsNotEmpty()
  @Expose()
  public readonly data: Buffer;
}
