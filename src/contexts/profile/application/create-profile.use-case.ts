import { Inject } from '@nestjs/common';
import { IProfileRepository } from '../domain/repositories/profile.repository';
import { IProfileRepositoryToken } from '../domain/repositories/user.repository.interface';
import { Profile } from '../infrastructure/repositories/profile.orm-entity';

export interface SocialLink {
  name: string;
  link: string;
}

export interface ICreateProfileDTO {
  firstName: string;
  lastName: string;
  country?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  profilePictureUrl?: string;
}

export class CreateProfileUseCase {
  constructor(
    @Inject(IProfileRepositoryToken)
    private readonly profileRepository: IProfileRepository
  ) {}

  async execute(
    createProfileInput: ICreateProfileDTO
  ): Promise<Profile | null> {
    console.log("a🚀 ~ CreateProfileUseCase ~ createProfileInput:", createProfileInput)

    
    const newProfile = await this.profileRepository.create({
      ...createProfileInput,
    });
    console.log("a🚀 ~ CreateProfileUseCase ~ newProfile:", newProfile)
    return newProfile;
  }
}
