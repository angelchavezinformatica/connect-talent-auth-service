import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from '../../infrastructure/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ValidateUserCredentialsUseCase } from 'src/contexts/users/application/validate-user-credential.use-case';
import { ResponseLoginAuthDto } from '../dtos/response-login.auth.dto';
import { CreateProfileDTO } from 'src/contexts/profile/adapters/dtos/create-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from '../../infrastructure/guard/google-auth.guard';
import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterDto } from '../dtos/register.dto';

// import { UserService } from 'src/contexts/users/infrastructure/services/typeorm-user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UserService
    private readonly validateUserCredentialUseCase: ValidateUserCredentialsUseCase
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginAuthDto> {
    const user = await this.validateUserCredentialUseCase.execute(
      loginDto.email,
      loginDto.password
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await this.authService.generateToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
    return {
      user: {
        id: user.id,
        profile: user.profile as CreateProfileDTO,
        email: user.email,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  @Post('register')
  registerUser(@Body() data: RegisterDto) {
    return this.authService.registerUser(data);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {
    console.log('hola');
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallBack(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ) {
    console.log(req.headers);

    console.log('llego a callback');
    const data = await this.authService.singInGoogle(req['user']);

    res.setCookie('data', JSON.stringify(data), {
      maxAge: 2592000000, // 30 días en milisegundos
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Cámbialo a true si estás en HTTPS
    });

    res.status(200).send({ message: 'Cookie configurada correctamente' });
  }
}
