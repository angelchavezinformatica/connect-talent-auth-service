import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { IProfileRepository } from '../../domain/repositories/profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.orm-entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TypeOrmProfileRepository implements IProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }
  async findOne(options: FindOneOptions<Profile>): Promise<Profile | null> {
    return this.profileRepository.findOne(options);
  }

  async create(user: Partial<Profile>): Promise<Profile> {
    return await this.profileRepository.save({ ...user });
  }
  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
  findOneById(id: number): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: { id } });
  }
}
