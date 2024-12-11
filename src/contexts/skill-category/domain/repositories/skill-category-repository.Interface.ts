import { SkillCategory } from '../../infrastructure/repositories/skill-category.orm.entity';

export interface ISkillCategoryRepository {
  findAll(): Promise<SkillCategory[]>;
  findById(id: number): Promise<SkillCategory | null>;
  create(skillCategory: Partial<SkillCategory>): Promise<SkillCategory>;
  update(
    id: number,
    skillCategory: Partial<SkillCategory>
  ): Promise<SkillCategory | null>;
  delete(id: number): Promise<void>;

  findByIds(ids: number[]): Promise<SkillCategory[]>;
}

export const ISkillCategoryRepositoryToken = Symbol(
  'ISkillCategoryRepositoryToken'
);
