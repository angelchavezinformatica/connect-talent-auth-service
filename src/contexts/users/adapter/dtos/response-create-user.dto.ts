import { TokensDto } from 'src/contexts/auth/adapters/dtos/response-jwt.auth.dto';
import { UserBasicResponseDto } from './user-basic-response.dto';

export class ResponseCreateUserDto {
  user: UserBasicResponseDto;
  tokens: TokensDto;
}
