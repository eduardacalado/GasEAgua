import { API_URL } from "@env";
import { store } from "@store/index";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiConfig = {
  baseURL: API_URL,
};

const api = axios.create(apiConfig);

api.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = store.getState().user.token;

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
  function (error: AxiosError<any>) {
    if (error.response?.status === 401) {
      store.dispatch(userActions.clearUserData());
      store.dispatch(authActions.clearAuthData());
    }
    return Promise.reject(error);
  }
);

export default api;
