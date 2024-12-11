import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDTO } from '../dtos/create-profile.dto';
import { Profile } from '../../infrastructure/repositories/profile.orm-entity';
import { CreateProfileUseCase } from '../../application/create-profile.use-case';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User | null> {
  //   return this.userService.findOne(+id);
  // }

  @Post()
  create(@Body() createProfileDto: CreateProfileDTO): Promise<Profile> {
    return this.createProfileUseCase.execute({
      ...createProfileDto,
    });
  }

  // @Delete(':id')
  // delete(@Param('id') id: number): Promise<void> {
  //   return this.createUseCase.delete(+id);
  // }
}
