import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import { ValidRoles } from '../auth/models/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] | undefined, ctx: ExecutionContext): User | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (roles && roles.length > 0) {
      // Verificar si el usuario tiene uno de los roles válidos
      const hasRole = roles.some((role) => user.role === role);
      if (!hasRole) {
        throw new ForbiddenException('Access denied: insufficient permissions');
      }
    }

    return user;
  }
);
