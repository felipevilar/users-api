import { IsString, IsNotEmpty } from "class-validator";

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  @IsNotEmpty()
  phone2: string;
}