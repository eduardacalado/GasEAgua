import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDates } from "./types";

type UserState = UserDates;

const initialState: UserState = {
  token: "",
  refreshToken: "",
  user: {
    id: 0,
    role: "",
    email: "",
    name: "",
    addresses: [],
    telephone: "",
    password: "",
  },
} as const;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserState>) => {
      const sessionRefreshToken = action.payload.refreshToken ?? "";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = sessionRefreshToken;
    },
    clearUserData() {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
