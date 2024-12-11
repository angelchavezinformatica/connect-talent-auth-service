import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Logger, LoggerLevel } from '../domain';

import { LoggerInterceptor } from './logger.interceptor';
import { NestLoggerService } from './nestjs.logger-service';
import { PinoLogger, PinoLoggerDependencies } from './pino.logger';

const loggerProvider: Provider = {
  provide: Logger,
  useFactory: (configService: ConfigService) => {
    console.log(configService.get<boolean>('LOGGER_ENABLED'));
    const isLoggerEnabled = configService.get<boolean>('LOGGER_ENABLED');
    const loggerLevel = configService.get<LoggerLevel>('LOGGER_LEVEL', 'info');
    // Verificar los valores de configuración
    console.log('LOGGER_ENABLED:', isLoggerEnabled);
    console.log('LOGGER_LEVEL:', loggerLevel);

    const dependencies: PinoLoggerDependencies = {
      isEnabled: isLoggerEnabled,
      level: loggerLevel,
    };
    return new PinoLogger(dependencies);
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [loggerProvider, NestLoggerService, LoggerInterceptor],
  exports: [loggerProvider, NestLoggerService, LoggerInterceptor],
})
export class LoggerModule {}
