import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDates } from "./types";

type UserState = UserDates;

const initialState: UserState = {
  token: "",
  user: {
    id: 0,
    isAdmin: false,
    email: "",
    name: "",
    telephone: "",
    password: "",
    addresses: [
      {
        street: "",
        reference: "",
        number: "",
        local: "",
        isDefault: false,
      },
    ],
  },
} as const;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUserData() {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
