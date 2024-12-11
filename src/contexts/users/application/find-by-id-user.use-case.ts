import { Inject } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../domain/repositories/user.repository.interface';
import { User } from '../infrastructure/entities/user.orm-entity';

export class FindByIdUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}
  execute(id: number): Promise<User | null> {
    return this.userRepository.findOneById(id);
  }
}
