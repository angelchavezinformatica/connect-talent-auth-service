import { IsArray, IsInt } from 'class-validator';

export class AssignSkillsDto {
  @IsArray()
  @IsInt({ each: true })
  skillIds: number[];
}
