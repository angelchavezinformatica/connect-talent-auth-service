import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AppConfig } from './env.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(
        process.cwd(),
        `.env.${process.env.NODE_ENV || 'dev'}`,
      ),
    }),
  ],
  providers: [
    {
      provide: AppConfig,
      useFactory: (configService: ConfigService) => new AppConfig(configService),
      inject: [ConfigService],
    },
  ],
  exports: [AppConfig],
})
export class ConfigModule {}
