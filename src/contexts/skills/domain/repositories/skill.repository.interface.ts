import { FindOneOptions } from 'typeorm';
import { Skill } from '../../infrastructure/entities/skill-orm.entity';

export interface ISkillRepository {
  findAll(): Promise<Skill[]>;
  findOneById(id: number): Promise<Skill | null>;
  create(user: Partial<Skill>): Promise<Skill>;
  delete(id: number): Promise<void>;
  findOne(options: FindOneOptions<Skill>): Promise<Skill | null>;
  findByIds(ids: number[]): Promise<Skill[]>;
}
