import { Exclude } from 'class-transformer';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

export type CreateUserParams = {
  username: string;
  email: string;
  role: UserRole;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserProfileParams = {
  first_name: string;
  last_name: string;
  age: number;
  dob: string;
};

export type CreateBookParams = {
  title: string;
  ISBN_no: string;
  publisher: string;
  number_pages: number;
  publication_date: string;
  synopsis: string;
  genre: string;
};

export type CreateUserReviewParams = {
  rating: number;
  comment?: string;
};

export class SerializedUser {
  username: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
