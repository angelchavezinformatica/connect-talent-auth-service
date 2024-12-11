import {
  IsString,
  IsOptional,
  IsUrl,
  Length,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class SocialLinkDTO {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsUrl()
  link: string;
}

export class CreateProfileDTO {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  country: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDTO)
  socialLinks?: SocialLinkDTO[];

  @IsOptional()
  @IsUrl()
  profilePictureUrl?: string;
}
