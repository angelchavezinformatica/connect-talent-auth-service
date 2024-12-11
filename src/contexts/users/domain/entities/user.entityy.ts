import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';
export interface UserProps {
  id?: number;
  email: string;
  provider?: string;

  accountValidated?: boolean;
  role: ValidRoles;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  password?: string;
  providerId?: string;
  phoneNumber?: string;
  recoveryCode?: string;
  deletedAt?: Date;
  profile?: number;
}

export class User {
  id?: number;
  email: string;

  providerId?: string;
  accountValidated: boolean;
  provider?: string;
  role: ValidRoles;
  password?: string;
  phoneNumber?: string;
  recoveryCode?: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  profile?: number;

  constructor({
    id,
    email,
    provider,

    profile,
    accountValidated,
    role,
    createdAt,
    updatedAt,
    isDeleted = false,
    password,
    providerId,
    phoneNumber,
    recoveryCode,
    deletedAt,
  }: UserProps) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.provider = provider;
    this.providerId = providerId;
    this.accountValidated = accountValidated;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.recoveryCode = recoveryCode;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.profile = profile;
  }
}
