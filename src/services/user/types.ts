export type UserPayload = {
  username: string;
  telephone?: string;
  address: {
    street: string;
    reference: string;
    number: string;
    local: string;
  };
};
