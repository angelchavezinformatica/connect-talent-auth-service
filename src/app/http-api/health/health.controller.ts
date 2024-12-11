import { Controller, Get, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";

@Controller("health")
export class HealthController {
  @Get()
  run(@Res() res: FastifyReply) {
    res.setCookie('example', 'value', {
      httpOnly: true,
      secure: false, // Cambia a true en producción si usas HTTPS
    });
    return res.send({ message: 'Cookie set!' });
  }
}
