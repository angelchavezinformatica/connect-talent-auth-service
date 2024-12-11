import { Inject, NotFoundException } from '@nestjs/common';
import {
  ISkillCategoryRepository,
  ISkillCategoryRepositoryToken,
} from '../domain/repositories/skill-category-repository.interface';

export class ValidateAndGetCategoriesByIdsUseCase {
  constructor(
    @Inject(ISkillCategoryRepositoryToken)
    private readonly skillCategoryRepository: ISkillCategoryRepository
  ) {}

  async execute(ids: number[]) {
    const categories = await this.skillCategoryRepository.findByIds(ids);

    if (categories.length !== ids.length) {
      throw new NotFoundException('Una o más categorías no existen.');
    }
    return categories;
  }
}
