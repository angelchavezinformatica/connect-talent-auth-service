import { FindOneOptions } from 'typeorm';
import { Profile } from '../../infrastructure/repositories/profile.orm-entity';

export interface IProfileRepository {
  findAll(): Promise<Profile[]>;
  findOneById(id: number): Promise<Profile | null>;
  create(user: Partial<Profile>): Promise<Profile>;
  delete(id: number): Promise<void>;

  findOne(options: FindOneOptions<Profile>): Promise<Profile | null>;
}
