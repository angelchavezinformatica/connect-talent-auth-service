import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDTO } from 'src/contexts/profile/adapters/dtos/create-profile.dto';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';

export class UserBasicResponseDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  role: ValidRoles;
  @ValidateNested()
  @Type(() => CreateProfileDTO)
  @IsOptional()
  profile?: CreateProfileDTO;
}
