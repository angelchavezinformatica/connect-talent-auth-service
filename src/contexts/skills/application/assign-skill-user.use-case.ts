import { Inject, BadRequestException } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../../users/domain/repositories/user.repository.interface';
import { ValidateAndGetSkillByIdsUseCase } from './find-by-ids-skill.use-case';
import { ISkillRepositoryToken } from '../domain/repositories/skill.repository';
import {
  IUserSkillRepository,
  IUserSkillRepositoryToken,
} from '../domain/repositories/skill-user.repository.interface';
import { ISkillRepository } from '../domain/repositories/skill.repository.interface';

interface AssignSkillUserInput {
  userId: number;
  skills: number[];
}

export class AssignSkillUserUseCase {
  constructor(
    @Inject(ISkillRepositoryToken)
    private readonly skillRepository: ISkillRepository,

    @Inject(IUserSkillRepositoryToken)
    private readonly userSkillRepository: IUserSkillRepository,

    private readonly validateAndGetSkillByIdsUseCase: ValidateAndGetSkillByIdsUseCase
  ) {}

  async execute(assignSkillUserInput: AssignSkillUserInput) {
    try {
      const skills = await this.validateAndGetSkillByIdsUseCase.execute(
        assignSkillUserInput.skills
      );

      return await this.userSkillRepository.assignUserSkill(
        assignSkillUserInput.userId,
        skills
      );
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Este usuario ya tiene asignada esta habilidad.'
        );
      }
    }
  }
}
