import { IsNotEmpty, IsString } from 'class-validator';

export class DownloadDto {
  @IsNotEmpty()
  @IsString()
  public readonly url: string;
}
