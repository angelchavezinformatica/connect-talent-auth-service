import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ErrorResponseNormalizerFilter } from './app/http-api/response-normalizer/error-response-normalizer.filter';
import { NestLoggerService } from './contexts/shared/logger/infrastructure/nestjs.logger-service';
import { AppModule } from './app/app.module';
import { SuccessResponseNormalizerInterceptor } from './app/http-api/response-normalizer/success-response-normalizer.interceptor';
import { LoggerInterceptor } from './contexts/shared/logger/infrastructure/logger.interceptor';
import { API } from './app/http-api/routes/route.constants';
import fastifyCookie from '@fastify/cookie';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('LOGGER_LEVEL (dotenv):', process.env.LOGGER_LEVEL);
  const fastifyAdapter = new FastifyAdapter();
  // await fastifyAdapter.register(fastifyExpress);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { bufferLogs: true }
  );
  const fastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance.addHook(
    'onRequest',
    (request: any, reply: any, done: () => void) => {
      reply.setHeader = function (key, value) {
        return this.raw.setHeader(key, value);
      };
      reply.end = function () {
        this.raw.end();
      };
      request.res = reply;
      done();
    }
  );
  const logger = app.get(NestLoggerService); // Cambiar para obtener NestLoggerService
  app.useLogger(logger);
  app.setGlobalPrefix(API);
  console.log(process.env.SECRET_COOKIE);

  app.use(cookieParser());

  await app.register(fastifyCookie as any, {
    secret: process.env.SECRET_COOKIE, // Clave opcional para firmar las cookies
  });

  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter));
  app.useGlobalInterceptors(
    app.get(LoggerInterceptor),
    app.get(SuccessResponseNormalizerInterceptor)
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');

  app.enableCors({
    origin: ['http://localhost:5173'], // Cambia a tus dominios permitidos
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true, // Permitir cookies o encabezados de autenticación
  });
  // await app.listen({ port: +port, host: '0.0.0.0' });
  await app.listen(port);

  logger.log(`App is ready and listening on port ${port} 🚀`); // Usando NestLoggerService
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on('uncaughtException', handleError);
