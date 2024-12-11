import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Res,
  Req,
  forwardRef,
  Inject,
  HttpException,
  HttpStatus,
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
import { FindUserByEmailUseCase } from 'src/contexts/users/application/find-by-email-use-case';
import { CreateUserUseCase } from 'src/contexts/users/application/create-user.use-case';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';
import { throws } from 'assert';

// import { UserService } from 'src/contexts/users/infrastructure/services/typeorm-user.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) // Asegúrate de usar forwardRef aquí
    private readonly authService: AuthService,
    // private readonly userService: UserService
    private readonly validateUserCredentialUseCase: ValidateUserCredentialsUseCase,
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly createUser: CreateUserUseCase
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
  async registerUser(@Body() data: RegisterDto) {
    try {
      const existingUser = await this.findUserByEmail.execute(data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      return this.createUser.execute({
        email: data.email,
        password: data.password,
        role: ValidRoles.COLLABORATOR,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
    } catch {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }
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
