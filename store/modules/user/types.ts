export type UserDatesProps = {
  name: string;
  email: string;
  isAdmin: string;
  id: string;
};

export type UserDates = {
  token: string;
  user: UserDatesProps;
};

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
  telephone: string;
};
