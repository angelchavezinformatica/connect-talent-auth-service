import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  // @ArrayNotEmpty() // Asegura que el array no esté vacío
  @IsInt({ each: true }) // Valida que cada elemento del array sea un número entero
  skillCategories: number[];
}
