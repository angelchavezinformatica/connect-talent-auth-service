import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { FindOneOptions, In, Repository } from 'typeorm';
import { ISkillRepository } from '../../domain/repositories/skill.repository.interface';
import { Skill } from '../entities/skill-orm.entity';

@Injectable()
export class TypeOrmSkillRepository implements ISkillRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async findOneById(id: number): Promise<Skill | null> {
    return this.skillRepository.findOne({ where: { id } });
  }

  async create(skill: Partial<Skill>): Promise<Skill> {
    console.log(
      '🚀 ~ file: skill-repository.ts:23 ~ TypeOrmSkillRepository ~ create ~ skill:',
      skill
    );
    const newSkill = await this.skillRepository.save({ ...skill });

    return newSkill;
  }

  async delete(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
  async findOne(options: FindOneOptions<Skill>): Promise<Skill | null> {
    return this.skillRepository.findOne(options);
  }

  async findByIds(ids: number[]): Promise<Skill[]> {
    return this.skillRepository.findBy({ id: In(ids) });
  }
}
