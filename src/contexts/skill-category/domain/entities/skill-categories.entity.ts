export interface SkillCategoryProps {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  iconUrl?: string;
  description?: string;
}

export class SkillCategory {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  iconUrl?: string;
  description?: string;
  constructor({
    id,
    name,
    createdAt,
    updatedAt,
    iconUrl,
    description,
  }: SkillCategoryProps) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.iconUrl = iconUrl;
    this.description = description;
  }
}
