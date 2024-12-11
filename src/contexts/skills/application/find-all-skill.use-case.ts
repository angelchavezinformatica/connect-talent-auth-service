import { Inject } from '@nestjs/common';
import { ISkillRepositoryToken } from '../domain/repositories/skill.repository';
import { ISkillRepository } from '../domain/repositories/skill.repository.interface';

export class FindAllSkillUseCase {
  constructor(
    // private readonly appConfig: AppConfig,
    @Inject(ISkillRepositoryToken)
    private readonly skillRepository: ISkillRepository
  ) {}

  async execute() {
    return this.skillRepository.findAll();
  }
}
