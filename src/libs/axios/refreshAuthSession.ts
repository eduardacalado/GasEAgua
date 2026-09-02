import { config } from "@config/environment";
import { store } from "@store/index";
import { userActions } from "@store/modules/user/slice";
import axios from "axios";
import { authSessionStorage } from "../storage/authSessionStorage";

type RefreshSessionResponse = {
  token: string;
  refreshToken: string;
};

export class SessionInvalidatedDuringRefreshError extends Error {
  constructor() {
    super("Sessão invalidada durante o refresh");
    this.name = "SessionInvalidatedDuringRefreshError";
  }
}

const refreshClient = axios.create({
  baseURL: config.API_URL,
});

let refreshInFlight: Promise<string> | null = null;

function throwIfSessionWasReplaced(expectedRefreshToken: string) {
  const currentRefreshToken = store.getState().user.refreshToken;
  const sessionWasReplaced = currentRefreshToken !== expectedRefreshToken;

  if (sessionWasReplaced) {
    throw new SessionInvalidatedDuringRefreshError();
  }
}

async function requestNewAuthSession(): Promise<string> {
  const refreshTokenUsedForRequest = store.getState().user.refreshToken;

  if (!refreshTokenUsedForRequest) {
    throw new Error("Refresh token ausente");
  }

  const response = await refreshClient.post<RefreshSessionResponse>(
    "/users/refresh-token",
    { refreshToken: refreshTokenUsedForRequest }
  );

  const sessionAfterRefresh = store.getState().user;
  throwIfSessionWasReplaced(refreshTokenUsedForRequest);

  const newAccessToken = response.data.token;
  const newRefreshToken = response.data.refreshToken;
  const updatedSession = {
    token: newAccessToken,
    refreshToken: newRefreshToken,
    user: sessionAfterRefresh.user,
  };

  store.dispatch(userActions.saveUser(updatedSession));
  throwIfSessionWasReplaced(updatedSession.refreshToken);

  await authSessionStorage.save(updatedSession);

  const sessionAfterStorageWrite = store.getState().user;
  const storageWriteLostTheSession =
    sessionAfterStorageWrite.refreshToken !== updatedSession.refreshToken;

  if (storageWriteLostTheSession) {
    await authSessionStorage.clear();
    throw new SessionInvalidatedDuringRefreshError();
  }

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
