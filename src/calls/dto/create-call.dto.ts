import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/users/dto/address.dto';

export class CreateCallDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  technician_id: string;

  @IsString()
  @IsNotEmpty()
  responsible_id: string;

  @IsString()
  @IsNotEmpty()
  problem_details: string;

  @IsString()
  @IsNotEmpty()
  solution_details: string;

  @IsArray({
    each: true,
  })
  @IsUrl()
  @IsOptional()
  images: string[];

  @IsBoolean()
  @IsOptional()
  closed: boolean;

  @IsString()
  @IsNotEmpty()
  date_start: Date;

  @IsString()
  @IsOptional()
  date_end: Date;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
