import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ISkillCategoryRepository } from '../../domain/repositories/skill-category-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillCategory } from './skill-category.orm.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TypeOrmSkillCategoryRepository
  implements ISkillCategoryRepository
{
  constructor(
    @InjectRepository(SkillCategory)
    private readonly skillCategory: Repository<SkillCategory>
  ) {}
  async create(skillCategory: SkillCategory): Promise<SkillCategory> {
    const result = await this.skillCategory.save({ ...skillCategory });

    return result;
  }
  async delete(id: number): Promise<void> {
    this.skillCategory.delete(id);
  }

  async findAll(): Promise<SkillCategory[]> {
    return this.skillCategory.find();
  }

  async findById(id: number): Promise<SkillCategory | null> {
    return this.skillCategory.findOne({ where: { id } });
  }

  async findByIds(ids: number[]): Promise<SkillCategory[]> {
    return this.skillCategory.findBy({ id: In(ids) });
  }

  async update(
    id: number,
    skillCategory: Partial<SkillCategory>
  ): Promise<SkillCategory | null> {
    return null;
  }
}
