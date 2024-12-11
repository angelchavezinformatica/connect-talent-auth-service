import {  UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor() {
    super();
    console.log('GoogleOauthGuard initialized');
  }

  handleRequest(err, user, info, context) {
    console.log('Inside GoogleOauthGuard handleRequest');
    console.log('User:', user);
    console.log('Info:', info);

    if (err || !user) {
      console.error('Error in GoogleOauthGuard:', err || 'User not authenticated');
      throw err || new UnauthorizedException('User not authenticated');
    }

    // No redirección automática: Devolvemos el usuario al controlador
    return user;
  }
}
