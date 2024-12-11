import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/user.module';
import { JwtStrategy } from './infrastructure/strategy/auth.strategy';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './adapters/controllers/auth.controller';
import { ValidateUserCredentialsUseCase } from '../users/application/validate-user-credential.use-case';
import { IUserRepositoryToken } from '../users/domain/repositories/user.repository.interface';
import { ConfigModule } from 'src/config/config.module';
import { GoogleStrategy } from './infrastructure/strategy/google-auth.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule), // Usar forwardRef para evitar ciclos
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    {
      provide: ValidateUserCredentialsUseCase,
      useFactory: (userRepository) => {
        return new ValidateUserCredentialsUseCase(userRepository);
      },
      inject: [IUserRepositoryToken], // Inyecta el token del repositorio que necesitas
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
