import { InjectRepository } from '@nestjs/typeorm';
import { IUserSkillRepository } from '../../domain/repositories/skill-user.repository.interface';
import { Skill } from '../entities/skill-orm.entity';
import { UserSkill } from '../entities/skill-user.orm.entity';
import { Repository } from 'typeorm';

export class TypeOrmUserSkillRepository implements IUserSkillRepository {
  constructor(
    @InjectRepository(UserSkill)
    private readonly userKillRepository: Repository<UserSkill>
  ) {}

  async assignUserSkill(userId: number, skills: Skill[]): Promise<void> {
    const userSkills = skills.map((skill) => {
      const userSkill = new UserSkill();
      userSkill.user = { id: userId } as any;
      userSkill.skill = skill;
      return userSkill;
    });
    await this.userKillRepository.save(userSkills);
  }
}
