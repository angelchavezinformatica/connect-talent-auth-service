import { Inject } from '@nestjs/common';
import {
  ISkillCategoryRepository,
  ISkillCategoryRepositoryToken,
} from '../domain/repositories/skill-category-repository.interface';
import { SkillCategory } from '../domain/entities/skill-categories.entity';

interface createSkillCategoryInput {
  name: string;
  description: string;
}

export class CreateSkillCategoryUseCase {
  constructor(
    @Inject(ISkillCategoryRepositoryToken)
    private readonly skillCategoryRepository: ISkillCategoryRepository
  ) {}

  async execute(createSkillCategoryInput: createSkillCategoryInput) {
    const newSkillCategory = new SkillCategory(createSkillCategoryInput);

    return await this.skillCategoryRepository.create(newSkillCategory);
  }
}
