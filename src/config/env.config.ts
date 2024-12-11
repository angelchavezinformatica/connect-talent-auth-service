// src/config/config.ts
import { ConfigService } from '@nestjs/config';

export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  // Configuración general

  get googlesSecret(): string {
    return this.configService.get<string>('GOOGLE_SECRET');
  }
  get googleClientID(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }
  get googleCallback():string{
    return this.configService.get<string>('GOOGLE_CALLBACK');

  }
  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get bcryptSalt(): number {
    return Number(this.configService.get<number>('BCRYPT_SALT', 10));
  }

  // Configuración de base de datos
  get dbType(): 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mongodb' {
    return this.configService.get<
      'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mongodb'
    >('DB_TYPE', 'postgres');
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  get dbSynchronize(): boolean {
    return this.configService.get<boolean>('DB_SYNC', true);
  }
}
