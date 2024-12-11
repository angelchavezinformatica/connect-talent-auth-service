import { Injectable, Inject } from '@nestjs/common';
import { IUserService } from '../domain/services/user.service.interface';
import { User } from '../infrastructure/entities/user.orm-entity';

@Injectable()
export class UserUseCasesService {
  constructor(
    @Inject('UserService') // Usamos el token de inyección para la interfaz
    private readonly userService: IUserService
  ) {}

  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

 

  create(user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  delete(id: number): Promise<void> {
    return this.userService.delete(id);
  }

  async validateUserCredentials(
    email: string,
    password: string
  ): Promise<User | null> {
    // Lógica de validación en la capa de aplicación
    const user = await this.userService.validateUserCredentials({
      where: { email, isDeleted: false },
    });
    if (user && user.password === password) {
      // Aquí deberías usar un hash de contraseña
      return user;
    }
    return null;
  }

  // Función de validación de contraseñas
  private isPasswordValid(user: User, password: string): boolean {
    // Aquí podrías aplicar hashing o lógica adicional de validación
    return user.password === password;
  }
}
