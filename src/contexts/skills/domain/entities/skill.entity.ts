export interface SkillProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  iconUrl?: string;
  description?: string;
}

export class Skill {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  iconUrl?: string;
  description?: string;

  constructor({
    id,
    name,
    createdAt,
    updatedAt,
    iconUrl,
    description,
  }: SkillProps) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.iconUrl = iconUrl;
    this.description = description;
  }
}
