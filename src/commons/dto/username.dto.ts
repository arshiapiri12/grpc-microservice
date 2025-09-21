import { IsNotEmpty, IsString } from 'class-validator';

/** ورودی از جنس نام کاربری  */
export class UsernameDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;
}
