import { IsNotEmpty, IsString } from "class-validator";

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  cep: string;
}