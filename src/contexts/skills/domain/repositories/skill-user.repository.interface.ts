import { Skill } from '../../infrastructure/entities/skill-orm.entity';

export interface IUserSkillRepository {
  assignUserSkill(userId: number, skills: Skill[]): Promise<void>;
}


export const IUserSkillRepositoryToken = Symbol('IUserSkillRepositoryToken');
