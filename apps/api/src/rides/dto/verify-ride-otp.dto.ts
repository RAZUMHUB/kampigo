import { IsString, Length } from 'class-validator';

export class VerifyRideOtpDto {
  @IsString()
  @Length(6, 6)
  otp!: string;
}
