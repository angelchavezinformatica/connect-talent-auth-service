import { FindOneOptions } from 'typeorm';
import { User } from '../../infrastructure/entities/user.orm-entity';

export interface IUserService {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;

  validateUserCredentials(options: FindOneOptions<User>): Promise<User | null>;
}
