import { config } from "@config/environment";
import { store } from "@store/index";
import { userActions } from "@store/modules/user/slice";
import axios from "axios";
import { authSessionStorage } from "../storage/authSessionStorage";

type RefreshSessionResponse = {
  token: string;
  refreshToken: string;
};

const refreshClient = axios.create({
  baseURL: config.API_URL,
});

let refreshInFlight: Promise<string> | null = null;

async function requestNewAuthSession(): Promise<string> {
  const currentSession = store.getState().user;
  const persistedRefreshToken = currentSession.refreshToken;

  if (!persistedRefreshToken) {
    throw new Error("Refresh token ausente");
  }

  const response = await refreshClient.post<RefreshSessionResponse>(
    "/users/refresh-token",
    { refreshToken: persistedRefreshToken }
  );

  const newAccessToken = response.data.token;
  const newRefreshToken = response.data.refreshToken;
  const updatedSession = {
    token: newAccessToken,
    refreshToken: newRefreshToken,
    user: currentSession.user,
  };

  store.dispatch(userActions.saveUser(updatedSession));
  await authSessionStorage.save(updatedSession);

  return newAccessToken;
}

export function refreshAuthSession(): Promise<string> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = requestNewAuthSession().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
}
