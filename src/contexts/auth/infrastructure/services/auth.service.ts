import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../domain/services/auth.service.domain';
// import { UserService } from 'src/contexts/users/infrastructure/services/typeorm-user.service';
import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import { FindByIdUserUseCase } from 'src/contexts/users/application/find-by-id-user.use-case';
import { FindUserByEmailUseCase } from 'src/contexts/users/application/find-by-email-use-case';
import { CreateUserUseCase } from 'src/contexts/users/application/create-user.use-case';
import { ResponseLoginAuthDto } from '../../adapters/dtos/response-login.auth.dto';
import { RegisterDto } from '../../adapters/dtos/register.dto';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly finByIdUserRepository: FindByIdUserUseCase,

    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly createUser: CreateUserUseCase
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
  async generateRefreshToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async validateUser(payload: any): Promise<User | null> {
    const { id } = payload;
    const user = await this.finByIdUserRepository.execute(id);

    return user;
  }

  async singInGoogle(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let newUser = await this.findUserByEmail.execute(user.email);

    if (!newUser) {
      // return await this.createUserUserCase.execute(user);
    }

    const tokens = {
      accessToken: await this.generateToken(newUser),
      refreshToken: await this.generateRefreshToken(newUser),
    };
    return { user: newUser, tokens: tokens } as ResponseLoginAuthDto;
  }

  async registerUser(data: RegisterDto) {
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
  }
}
