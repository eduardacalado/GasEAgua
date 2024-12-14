import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
} as const;

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    updateAuthStore: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearAuthData: () => initialState,
  },
});

export const authActions = authSlice.actions;

export default authSlice;
