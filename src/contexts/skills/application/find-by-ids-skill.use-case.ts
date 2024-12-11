import { Inject, NotFoundException } from '@nestjs/common';
import { ISkillRepositoryToken } from '../domain/repositories/skill.repository';
import { ISkillRepository } from '../domain/repositories/skill.repository.interface';

export class ValidateAndGetSkillByIdsUseCase {
  constructor(
    @Inject(ISkillRepositoryToken)
    private readonly skillRepository: ISkillRepository
  ) {}

  async execute(ids: number[]) {
    const categories = await this.skillRepository.findByIds(ids);

    if (categories.length !== ids.length) {
      throw new NotFoundException('Una o más categorías no existen.');
    }
    return categories;
  }
}
