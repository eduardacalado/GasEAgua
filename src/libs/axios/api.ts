import { config } from "@config/environment";
import { store } from "@store/index";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { authSessionStorage } from "../storage/authSessionStorage";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  refreshAuthSession,
  SessionInvalidatedDuringRefreshError,
} from "./refreshAuthSession";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retriedAfterRefresh?: boolean;
};

const apiConfig = {
  baseURL: config.API_URL,
};

const api = axios.create(apiConfig);

function clearAuthSession() {
  authSessionStorage.clear();
  store.dispatch(userActions.clearUserData());
  store.dispatch(authActions.clearAuthData());
}

function isRefreshTokenRequest(requestConfig?: AxiosRequestConfig): boolean {
  const requestUrl = requestConfig?.url ?? "";
  return requestUrl.includes("/users/refresh-token");
}

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = store.getState().user.token;
    console.log({ config });

    if (token && token !== "") {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config as InternalAxiosRequestConfig;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error: AxiosError<any>) {
    console.log(JSON.stringify(error, null, 2));

    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const isUnauthorized = error.response?.status === 401;

    if (!isUnauthorized || !originalRequest) {
      return Promise.reject(error);
    }

    const alreadyRetriedAfterRefresh = Boolean(
      originalRequest._retriedAfterRefresh
    );
    const hasRefreshToken = Boolean(store.getState().user.refreshToken);
    const shouldClearSessionWithoutRefresh =
      isRefreshTokenRequest(originalRequest) ||
      alreadyRetriedAfterRefresh ||
      !hasRefreshToken;

    if (shouldClearSessionWithoutRefresh) {
      clearAuthSession();
      return Promise.reject(error);
    }

    try {
      const newAccessToken = await refreshAuthSession();
      originalRequest._retriedAfterRefresh = true;

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return api(originalRequest);
    } catch (refreshError) {
      const wasSessionReplacedDuringRefresh =
        refreshError instanceof SessionInvalidatedDuringRefreshError;

      if (!wasSessionReplacedDuringRefresh) {
        clearAuthSession();
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;
