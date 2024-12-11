import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkillCategoryUseCase } from '../../application/create-skill-category.use-case';
import { CreateSkillCategoryDto } from '../dtos/create-skill-category.dto';
import { FindAllSkillCategoryUseCase } from '../../application/find-all-skill-category.use.case';

@Controller('skill-categories')
export class SkillCategoryController {
  constructor(
    private readonly createSkillCategoryUseCase: CreateSkillCategoryUseCase,
    private readonly findAllSkillCategoryUseCase: FindAllSkillCategoryUseCase
  ) {}

  @Post()
  async create(@Body() createSkillCategoryDto: CreateSkillCategoryDto) {
    const dataResult = await this.createSkillCategoryUseCase.execute(
      createSkillCategoryDto
    );
 
    return dataResult;
  }

  @Get()
  async findAll() {
    return await this.findAllSkillCategoryUseCase.execute();
  }
}
