import { User } from 'src/contexts/users/infrastructure/entities/user.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Skill } from './skill-orm.entity';

@Unique(['user', 'skill']) // Clave única compuesta
@Entity('user_skills')
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSkills, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User | number;

  @ManyToOne(() => Skill, (skill) => skill.userSkills, { nullable: false })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({ type: 'varchar', length: 50, default: null })
  level: string;

  @Column({ type: 'int', default: 0 })
  yearsOfExperience: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
