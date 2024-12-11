import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.repository';
import { User } from './infrastructure/entities/user.orm-entity';
import { UserController } from './adapter/controllers/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { ProfilesModule } from '../profile/profile.module';
import { IUserRepositoryToken } from './domain/repositories/user.repository.interface';
import { FindByIdUserUseCase } from './application/find-by-id-user.use-case';
import { SkillModule } from '../skills/skill.module';
import { FindUserByEmailUseCase } from './application/find-by-email-use-case';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    SkillModule,
    forwardRef(() => AuthModule), // Usar forwardRef para evitar ciclos
    forwardRef(() => ProfilesModule),
  ],
  providers: [
    {
      provide: IUserRepositoryToken,
      useClass: TypeOrmUserRepository,
    },
    CreateUserUseCase,
    FindByIdUserUseCase,
    FindUserByEmailUseCase
  ],
  controllers: [UserController],
  exports: [
    IUserRepositoryToken,
    FindByIdUserUseCase,
    CreateUserUseCase,
    FindUserByEmailUseCase
    // FindUserByEmailUseCase,
  ],
})
export class UsersModule {}
