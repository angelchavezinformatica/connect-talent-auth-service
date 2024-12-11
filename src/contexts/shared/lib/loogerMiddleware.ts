import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RegisterFastifyContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Reflect.defineMetadata('fastify:context', { req, reply: res }, req);
    next();
  }
}
