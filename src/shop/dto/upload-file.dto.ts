import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  public readonly file: Buffer;

  @IsNotEmpty()
  public readonly filename: string;
}
