import { FindOneOptions } from 'typeorm';
import { User } from '../../infrastructure/entities/user.orm-entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;

  findOne(options: FindOneOptions<User>): Promise<User | null>;
  findByEmail(email: string): Promise<User>;
}
export const IUserRepositoryToken = Symbol('IUserRepositoryToken');
