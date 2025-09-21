import { IsNotEmpty, IsString } from 'class-validator';

/**
 *ورودی شناسه
 */
export class IDDto {
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
