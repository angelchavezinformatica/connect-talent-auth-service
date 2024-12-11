import { SkillCategory } from 'src/contexts/skill-category/infrastructure/repositories/skill-category.orm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserSkill } from './skill-user.orm.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  iconUrl?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => SkillCategory, (category) => category.skills)
  @JoinTable({
    name: 'skill_category_skill', // Nombre de la tabla de unión
    joinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill_category_id',
      referencedColumnName: 'id',
    },
  })
  categories: SkillCategory[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.skill)
  userSkills: UserSkill[];
}
