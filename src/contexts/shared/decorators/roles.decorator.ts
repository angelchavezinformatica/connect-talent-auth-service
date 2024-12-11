import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../auth/models/valid-roles.enum';

export const Roles = (...roles: ValidRoles[]) => SetMetadata('roles', roles);
