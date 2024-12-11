import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.orm-entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    console.log('🚀 ~ TypeOrmUserRepository ~ create ~ user:', user);
    const newUser = await this.userRepository.save({ ...user });

    return newUser;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(options);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
