export type UserDatesProps = {
  name: string;
  email: string;
  isAdmin: boolean;
  id: number;
  address: {
    street: string;
    reference: string;
    number: string;
    local: string;
  };
  telephone: string;
  password: string;
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
