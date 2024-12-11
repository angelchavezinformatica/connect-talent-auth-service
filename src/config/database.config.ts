import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Profile } from 'src/contexts/profile/infrastructure/repositories/profile.orm-entity';
import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import { ConfigModule } from './config.module';
import { AppConfig } from './env.config';
import { SkillCategory } from 'src/contexts/skill-category/infrastructure/repositories/skill-category.orm.entity';
import { Skill } from 'src/contexts/skills/infrastructure/entities/skill-orm.entity';
import { UserSkill } from 'src/contexts/skills/infrastructure/entities/skill-user.orm.entity';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule], // Asegúrate de importar ConfigModule para proporcionar ConfigService
  inject: [AppConfig], // ConfigService se inyecta para usar las variables de entorno
  useFactory: async (
    configService: AppConfig
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: configService.dbType, // Ajusta según el tipo de base de datos
      host: configService.dbHost,
      port: configService.dbPort,
      username: configService.dbUsername,
      password: configService.dbPassword,
      database: configService.dbName,
      entities: [
        User,
        Profile,
        Skill,
        UserSkill,
        SkillCategory,
        // SkillCategorySkill,
      ], // Importa explícitamente tus entidades
      synchronize: configService.dbSynchronize,
    };
  },
};
