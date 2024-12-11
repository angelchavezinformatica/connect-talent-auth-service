import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import { ValidRoles } from '../auth/models/valid-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.get<ValidRoles[]>(
      'roles',
      context.getHandler()
    );
    if (!validRoles || validRoles.length === 0) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return validRoles.includes(user.role as ValidRoles);
  }
}
