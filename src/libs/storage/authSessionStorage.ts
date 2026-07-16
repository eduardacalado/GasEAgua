import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDates } from "@store/modules/user/types";

const AUTH_SESSION_STORAGE_KEY = "@gas-e-agua:auth-session";

async function saveAuthSession(authSession: UserDates): Promise<void> {
  const serializedSession = JSON.stringify(authSession);
  await AsyncStorage.setItem(AUTH_SESSION_STORAGE_KEY, serializedSession);
}

async function getAuthSession(): Promise<UserDates | null> {
  const serializedSession = await AsyncStorage.getItem(
    AUTH_SESSION_STORAGE_KEY
  );

  if (!serializedSession) {
    return null;
  }

  return JSON.parse(serializedSession) as UserDates;
}

async function clearAuthSession(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

export const authSessionStorage = {
  save: saveAuthSession,
  get: getAuthSession,
  clear: clearAuthSession,
};
