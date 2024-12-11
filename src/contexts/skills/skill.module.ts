import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ISkillRepositoryToken } from './domain/repositories/skill.repository';
import { CreateSkillCase } from './application/create-skill.use-case';
import { SkillController } from './adapter/controllers/skill.controller';
import { Skill } from './infrastructure/entities/skill-orm.entity';
import { UserSkill } from './infrastructure/entities/skill-user.orm.entity';
import { TypeOrmSkillRepository } from './infrastructure/repositories/skill-repository';
import { SkillCategoryModule } from '../skill-category/skill-category.module';
import { FindAllSkillUseCase } from './application/find-all-skill.use-case';
import { AssignSkillUserUseCase } from './application/assign-skill-user.use-case';
import { TypeOrmUserSkillRepository } from './infrastructure/repositories/skill-user.repository';
import { IUserSkillRepositoryToken } from './domain/repositories/skill-user.repository.interface';
import { ValidateAndGetSkillByIdsUseCase } from './application/find-by-ids-skill.use-case';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Skill, UserSkill]),
    SkillCategoryModule,
  ],
  providers: [
    {
      provide: IUserSkillRepositoryToken,
      useClass: TypeOrmUserSkillRepository,
    },
    {
      provide: ISkillRepositoryToken,
      useClass: TypeOrmSkillRepository,
    },
    CreateSkillCase,
    FindAllSkillUseCase,
    AssignSkillUserUseCase,
    ValidateAndGetSkillByIdsUseCase
  ],
  controllers: [SkillController],

  exports: [AssignSkillUserUseCase],
})
export class SkillModule {}
