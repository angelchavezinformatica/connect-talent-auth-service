import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { SkillCategory } from './infrastructure/repositories/skill-category.orm.entity';
import { ISkillCategoryRepositoryToken } from './domain/repositories/skill-category-repository.interface';
import { TypeOrmSkillCategoryRepository } from './infrastructure/repositories/skill-category.repository';
import { CreateSkillCategoryUseCase } from './application/create-skill-category.use-case';
import { SkillCategoryController } from './adapter/controllers/skill-category.controller';
import { FindAllSkillCategoryUseCase } from './application/find-all-skill-category.use.case';
import { ValidateAndGetCategoriesByIdsUseCase } from './application/find-by-ids-skill-category.use-case';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SkillCategory])],
  providers: [
    {
      provide: ISkillCategoryRepositoryToken,
      useClass: TypeOrmSkillCategoryRepository,
    },
    CreateSkillCategoryUseCase,
    FindAllSkillCategoryUseCase,
    ValidateAndGetCategoriesByIdsUseCase,
  ],
  controllers: [SkillCategoryController],
  exports: [ValidateAndGetCategoriesByIdsUseCase],
})
export class SkillCategoryModule {}
