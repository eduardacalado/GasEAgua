export type Address = {
  id: number;
  street: string | null;
  reference: string;
  number: string | null;
  local: string;
  user_id: number;
  isDefault: boolean;
  created_at: string;
  updated_at: string;
};

export type UserDatesProps = {
  name: string;
  email: string;
  role: string;
  id: number;
  addresses: Address[];
  telephone?: string;
  password?: string;
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
