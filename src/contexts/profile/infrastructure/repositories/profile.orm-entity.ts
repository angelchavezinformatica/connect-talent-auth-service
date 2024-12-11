import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

interface SocialLink {
  name: string;
  link: string;
}
@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'national_id', type: 'varchar', length: 100, nullable: true })
  nationalId: string;

  @Column({ name: 'country', type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'social_links', type: 'json', nullable: true })
  socialLinks: SocialLink[];

  @Column({
    name: 'profile_picture_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profilePictureUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
