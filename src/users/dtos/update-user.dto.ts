import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  password: string;
}