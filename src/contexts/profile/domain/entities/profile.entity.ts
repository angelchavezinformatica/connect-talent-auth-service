export interface ProfileProps {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  nationalId?: string;
  bio?: string;
  socialLinks?: string;
  profilePictureUrl?: string;
}

export class Profile {
  private readonly id: string;
  private readonly userId: number;
  private firstName: string;
  private lastName: string;
  private nationalId?: string;
  private country: string;
  private bio?: string;
  private socialLinks?: string;
  private profilePictureUrl?: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: ProfileProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.country = props.country;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.nationalId = props.nationalId;
    this.bio = props.bio;
    this.socialLinks = props.socialLinks;
    this.profilePictureUrl = props.profilePictureUrl;
  }
}
