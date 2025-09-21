import { IsNotEmpty, IsString, Matches } from 'class-validator';

/** ورودی از جنس شماره موبایل */
export class PhoneNumberDto {
  @Matches(/(^|,)(09[0-9]{9}|1[3-9][0-9]{9})|(1[0-9]{10})+$/)
  @IsString()
  @IsNotEmpty()
  public phoneNumber: string;
}
