// contexts/users/application/use-cases/create-user.use-case.ts

import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';
import { User } from '../domain/entities/user.entityy';
import * as bcrypt from 'bcrypt';

import { ResponseCreateUserDto } from '../adapter/dtos/response-create-user.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { AuthService } from 'src/contexts/auth/infrastructure/services/auth.service';
import {
  CreateProfileUseCase,
  ICreateProfileDTO,
} from 'src/contexts/profile/application/create-profile.use-case';
import { AppConfig } from 'src/config/env.config';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../domain/repositories/user.repository.interface';
import { AuthProvider } from '../infrastructure/entities/user.orm-entity';

interface CreateUserInput {
  email: string;
  password: string;
  role: ValidRoles;
  profile?: ICreateProfileDTO;
  provider?: AuthProvider | string;
  providerId?: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly appConfig: AppConfig,
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    private readonly authService: AuthService,
    private readonly createProfileUseCase: CreateProfileUseCase
  ) {}

  async execute(
    createUserInput: CreateUserInput
  ): Promise<ResponseCreateUserDto> {
    try {
      const { profile: profileData, ...rest } = createUserInput;
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserInput.email },
      });

      if (existingUser) {
        throw new BadRequestException({
          message: 'El correo electrónico ya está en uso',
          field: 'email',
        });
      }
      const [profile, hash] = await Promise.all([
        this.createProfileUseCase.execute(profileData),
        this.hashPassword(createUserInput.password, this.appConfig.bcryptSalt),
      ]);

      const user = new User({
        ...rest,
        profile: profile.id,
        password: hash,
      });

      const newUserRepository = await this.userRepository.create(user);

      const [accessToken, refreshToken] = await Promise.all([
        this.authService.generateToken(newUserRepository),
        this.authService.generateRefreshToken(newUserRepository),
      ]);

      return {
        user: {
          email: newUserRepository.email,
          id: newUserRepository.id,
          profile: profile,

          role: newUserRepository.role,
        },
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (err) {
      throw err;
      //TODO: MEJORAR EL MANEJO DE RESPUESTA
    }
  }

  hashPassword = (password: string, salt: number): string => {
    const saltGenerated = bcrypt.genSaltSync(salt);
    return bcrypt.hashSync(password, saltGenerated);
  };
}
