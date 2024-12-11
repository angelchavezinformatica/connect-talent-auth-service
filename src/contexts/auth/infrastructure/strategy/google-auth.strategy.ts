import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/contexts/users/adapter/dtos/create-user.dto';
import { AuthProvider } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/login',
      scope: ['profile', 'email'],
    });
    console.log('GoogleStrategy initialized');
  }

  // Este método valida y transforma el perfil recibido de Google
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;

      const user: CreateUserDto = {
        email: emails?.[0]?.value || '',
        password: 'hashed-google',
        provider: AuthProvider.GOOGLE,
        providerId: id,
        role: ValidRoles.COLLABORATOR,
        profile: {
          firstName: name?.givenName || 'Default First Name',
          lastName: name?.familyName || 'Default Last Name',
          profilePictureUrl: photos?.[0]?.value || '',
          country: '',
        },
      };

      console.log('User authenticated:', user);
      done(null, user); // Devuelve el usuario autenticado al flujo
    } catch (error) {
      console.error('Error in GoogleStrategy validate:', error);
      done(error, null); // Maneja errores de autenticación
    }
  }

  // Sobreescribir el método redirect para usar Fastify
  redirect(url: string, status: number): void {
    const context = Reflect.getMetadata('fastify:context', this);
    const reply = context?.reply;

    if (!reply) {
      throw new Error('Fastify reply object not found in context');
    }

    console.log('Redirecting to:', url);
    reply.status(status).redirect(url); // Redirección con Fastify
  }
}
