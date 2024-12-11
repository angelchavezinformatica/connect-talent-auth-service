import * as bcrypt from 'bcrypt';
import { BadRequestException, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository.interface';
import { IUserRepositoryToken } from '../domain/repositories/user.repository.interface';

export class ValidateUserCredentialsUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string) {
    console.log(
      '🚀 ~ ValidateUserCredentialsUseCase ~ execute ~ email:',
      email
    );

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
