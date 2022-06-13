import { ContactDto } from './contact.dto';
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber({
    allowNaN: false,
  })
  @IsNotEmpty()
  rules: 1 | 2 | 3 | 4 | 5;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: "M" | "F" | "O";

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto
}
