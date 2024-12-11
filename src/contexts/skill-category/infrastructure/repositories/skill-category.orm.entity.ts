import { Skill } from 'src/contexts/skills/infrastructure/entities/skill-orm.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill_categories')
export class SkillCategory {
  @PrimaryGeneratedColumn()
  id?: number;

  // @OneToMany(
  //   () => SkillCategorySkill,
  //   (skillCategorySkill) => skillCategorySkill.skillCategory,
  //   { onDelete: 'CASCADE' }
  // )
  // skills: SkillCategorySkill[];

  @ManyToMany(() => Skill, (skill) => skill.categories)
  skills: Skill[];

  @Column({ nullable: true })
  iconUrl?: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
