import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkillCase } from '../../application/create-skill.use-case';
import { CreateSkillDto } from '../dtos/create-skill.dto';
import { FindAllSkillUseCase } from '../../application/find-all-skill.use-case';

@Controller('skills')
export class SkillController {
  constructor(
    private readonly createSkillCase: CreateSkillCase,

    private readonly findAllSkillsUseCase: FindAllSkillUseCase
  ) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.createSkillCase.execute(createSkillDto);
  }

  @Get()
  async findAll() {
    return await this.findAllSkillsUseCase.execute();
  }
}
