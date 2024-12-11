import { Inject } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../domain/repositories/user.repository.interface';

export class FindUserByEmailUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(email: string) {
    const result = await this.userRepository.findByEmail(email);
    return result;
  }
}
