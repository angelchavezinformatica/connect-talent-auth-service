import { Inject } from '@nestjs/common';
import {
  ISkillCategoryRepository,
  ISkillCategoryRepositoryToken,
} from '../domain/repositories/skill-category-repository.interface';

export class FindAllSkillCategoryUseCase {
  constructor(
    @Inject(ISkillCategoryRepositoryToken)
    private readonly skillCategoryRepository: ISkillCategoryRepository
  ) {}

  execute() {
    return this.skillCategoryRepository.findAll();
  }
}
