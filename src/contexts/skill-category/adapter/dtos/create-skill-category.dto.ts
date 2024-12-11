import { IsOptional, IsString } from 'class-validator';

export class CreateSkillCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
