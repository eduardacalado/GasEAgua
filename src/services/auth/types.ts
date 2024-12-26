export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthState = {
  isAuthenticated: boolean;
};

export type SignupPayload = {
    username: string,
    email: string,
    password: string,
    telephone: string,
    address: {
      street?: string | undefined,
      reference: string,
      local: string,
      number?: string | undefined
    }
}