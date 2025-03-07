export type UserDatesProps = {
  name: string;
  email: string;
  isAdmin: boolean;
  id: string;
  address: {
    street: string,
    reference: string,
    number: string,
    local: string | undefined,
  }
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
