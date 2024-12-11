import { Profile } from 'src/contexts/profile/infrastructure/repositories/profile.orm-entity';
import { ValidRoles } from 'src/contexts/shared/auth/models/valid-roles.enum';
import { UserSkill } from 'src/contexts/skills/infrastructure/entities/skill-user.orm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

export enum AuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'gitHub',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  OTHER = 'other',
}
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({
    name: 'provider',
    type: 'enum',
    enum: AuthProvider,
    nullable: true,
  })
  provider: string | AuthProvider;

  @Column({ name: 'provider_id', nullable: true })
  providerId: string;

  @Column({ name: 'account_validated', default: false })
  accountValidated: boolean;

  @Column({
    name: 'role',
    type: 'enum',
    enum: ValidRoles,
    default: ValidRoles.COLLABORATOR,
  })
  role: ValidRoles;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'recovery_code', nullable: true })
  recoveryCode: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile | number;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];
}
