export type UserDatesProps = {
  name: string;
  email: string;
  isAdmin: boolean;
  id: number;
  addresses: {
    street: string;
    reference: string;
    number: string;
    local: string;
    isDefault: boolean;
  }[];
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
