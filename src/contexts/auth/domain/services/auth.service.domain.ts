import { User } from '../../../users/infrastructure/entities/user.orm-entity';
import { ResponseLoginAuthDto } from '../../adapters/dtos/response-login.auth.dto';

export interface IAuthService {
  generateToken(user: User): Promise<string>;
  validateUser(payload: any): Promise<User | null>;

  singInGoogle(user: Object): Promise<ResponseLoginAuthDto>;
}
