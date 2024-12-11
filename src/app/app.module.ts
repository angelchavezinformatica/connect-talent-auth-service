import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'src/contexts/shared/logger/infrastructure/logger.module';
import { HttpApiModule } from './http-api/http-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.config';
import { UsersModule } from 'src/contexts/users/user.module';
import { AuthModule } from 'src/contexts/auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { SkillModule } from 'src/contexts/skills/skill.module';
import { SkillCategoryModule } from 'src/contexts/skill-category/skill-category.module';
import { AlgorithmsModule } from 'src/contexts/shared/algorith/algorith.module';
import {  RegisterFastifyContextMiddleware } from 'src/contexts/shared/lib/loogerMiddleware';

@Module({
  imports: [
    ConfigModule,

    TypeOrmModule.forRootAsync(databaseConfig), // Usar la configuración centralizada para la conexión a la DB
    AlgorithmsModule,
    HttpApiModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    SkillModule,
    SkillCategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterFastifyContextMiddleware).forRoutes('*');
  }
}
