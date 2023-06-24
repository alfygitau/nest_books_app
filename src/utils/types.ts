export type CreateUserParams = {
  username: string;
  email: string;
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
