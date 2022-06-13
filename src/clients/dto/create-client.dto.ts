import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { AddressDto } from "src/users/dto/address.dto";
import { ContactDto } from "./contact.dto";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  register: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto
}
