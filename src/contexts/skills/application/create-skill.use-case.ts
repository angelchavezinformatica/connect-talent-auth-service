import { Inject } from '@nestjs/common';
import { ISkillRepository } from '../domain/repositories/skill.repository.interface';
import { ISkillRepositoryToken } from '../domain/repositories/skill.repository';
import { AppConfig } from 'src/config/env.config';
import { ValidateAndGetCategoriesByIdsUseCase } from 'src/contexts/skill-category/application/find-by-ids-skill-category.use-case';

interface CreateSkillInput {
  name: string;
  description: string;
  skillCategories: number[];
}
export class CreateSkillCase {
  constructor(
    // private readonly appConfig: AppConfig,
    @Inject(ISkillRepositoryToken)
    private readonly skillRepository: ISkillRepository,
    private readonly validateAndGetCategoriesByIds: ValidateAndGetCategoriesByIdsUseCase
  ) {}

  async execute(createSkillInput: CreateSkillInput) {
    const { skillCategories, ...rest } = createSkillInput;
    console.log(
      '🚀 ~ file: create-skill.use-case.ts:22 ~ CreateSkillCase ~ execute ~ skillCategories:',
      skillCategories
    );
    console.log(
      '🚀 ~ file: create-skill.use-case.ts:22 ~ CreateSkillCase ~ execute ~ rest:',
      rest
    );
    const categories =
      await this.validateAndGetCategoriesByIds.execute(skillCategories);
    console.log(
      '🚀 ~ file: create-skill.use-case.ts:25 ~ CreateSkillCase ~ execute ~ categories:',
      categories
    );

    const skill = this.skillRepository.create({
      ...rest,
      categories: categories,
    });

    return skill;
  }
}
