import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // Define tu clave secreta en .env
    });
  }

  async validate(payload: any): Promise<User | null> {
    console.log("🚀 ~ file: auth.strategy.ts:18 ~ JwtStrategy ~ validate ~ payload:", payload)
    // Validar al usuario con base en el ID o los datos del payload
    return this.authService.validateUser(payload);
  }
}
