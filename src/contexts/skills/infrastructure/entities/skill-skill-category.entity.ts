// import { SkillCategory } from 'src/contexts/skill-category/infrastructure/repositories/skill-category.orm.entity';
// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Skill } from './skill-orm.entity';

// @Entity('skill_category_skill')
// export class SkillCategorySkill {
//   @PrimaryGeneratedColumn()
//   id: number; 

//   @ManyToOne(() => Skill, (skill) => skill.categories)
//   @JoinColumn({ name: 'skill_id' })
//   skill: Skill;

//   @ManyToOne(() => SkillCategory, (category) => category.skills)
//   @JoinColumn({ name: 'skill_category_id' })
//   skillCategory: SkillCategory;
// }
