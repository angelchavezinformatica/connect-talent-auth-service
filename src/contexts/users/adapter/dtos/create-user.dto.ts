import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDTO } from 'src/contexts/profile/adapters/dtos/create-profile.dto';

export class CreateUserDto {
  // @IsNotEmpty()
  // @IsString()
  // firstName: string;

  // @IsNotEmpty()
  // @IsString()
  // lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  role: string;


  @IsString()
  @IsOptional()
  provider: string;

  @IsString()
  @IsOptional()
  providerId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDTO)
  @IsOptional()
  profile?: CreateProfileDTO;
}
