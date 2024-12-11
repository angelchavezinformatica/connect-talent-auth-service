// user.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './infrastructure/repositories/profile.orm-entity';
import { TypeOrmProfileRepository } from './infrastructure/repositories/profile.repository';
import { CreateProfileUseCase } from './application/create-profile.use-case';
import { ProfileController } from './adapters/controllers/profile.controller';
import { IProfileRepositoryToken } from './domain/repositories/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [
    {
      provide: IProfileRepositoryToken,
      useClass: TypeOrmProfileRepository,
    },
    CreateProfileUseCase,
  ],
  controllers: [ProfileController],
  exports: [IProfileRepositoryToken,CreateProfileUseCase],
})
export class ProfilesModule {}
