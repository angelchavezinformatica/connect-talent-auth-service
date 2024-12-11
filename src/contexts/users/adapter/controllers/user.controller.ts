import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/create-user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';
import { User } from '../../domain/entities/user.entityy';
import { ResponseCreateUserDto } from '../dtos/response-create-user.dto';
import { AssignSkillsDto } from '../dtos/assign-skill.dto';
import { JwtAuthGuard } from 'src/contexts/shared/auth/guard/jwt-auth-guard';
import { CurrentUser } from 'src/contexts/shared/decorators/current-user.decorator';
import { AssignSkillUserUseCase } from 'src/contexts/skills/application/assign-skill-user.use-case';
import { PriorityScheduler } from 'src/contexts/shared/algorith/PriorityScheluder';
import { Logger } from 'src/contexts/shared/logger/domain';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly assignSkillUseCase: AssignSkillUserUseCase,
    private readonly priorityScheduler: PriorityScheduler<User>,
    private readonly logger: Logger
  ) {}

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User | null> {
  //   return this.userService.findOne(+id);
  // }

  @Post('collaborator')
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ResponseCreateUserDto> {
    console.log('🚀 ~ UserController ~ create ~ createUserDto:', createUserDto);
    return await this.createUserUseCase.execute({
      ...createUserDto,
      role: ValidRoles.COLLABORATOR,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('assign-skills')
  async assignSkills(
    @CurrentUser() user: User,
    @Body() assignSkillsDto: AssignSkillsDto
  ) {
    try {
      await this.assignSkillUseCase.execute({
        userId: user.id,
        skills: assignSkillsDto.skillIds,
      });
    } catch (err) {
      throw err;
    }
  }

  @Post('verify')
  // @UseGuards(JwtAuthGuard)
  async verifyUser(@CurrentUser() user: User) {
    let priority = 1;
    if (user.role === ValidRoles.PROJECT_OWNER) priority = 2;
    else if (user.role === ValidRoles.ADMIN) priority = 3;

    this.priorityScheduler.addTask(user, priority, async () => {
      this.logger.info(
        `Verificando usuario ${user.id} con prioridad ${priority}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación del proceso
      this.logger.info(`Verificación completada para el usuario ${user.id}`);
    });

    return {
      message: 'Solicitud de verificación añadida a la cola con prioridad',
    };
  }
  // @Delete(':id')
  // delete(@Param('id') id: number): Promise<void> {
  //   return this.createUseCase.delete(+id);
  // }
}
