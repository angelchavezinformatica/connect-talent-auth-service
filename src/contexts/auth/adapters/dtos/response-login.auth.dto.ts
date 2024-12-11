import { UserBasicResponseDto } from 'src/contexts/users/adapter/dtos/user-basic-response.dto';
import { TokensDto } from './response-jwt.auth.dto';

export class ResponseLoginAuthDto {
  user: UserBasicResponseDto;
  tokens: TokensDto;
}
