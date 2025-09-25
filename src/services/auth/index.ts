import api from "@libs/axios/api";
import { UserDates } from "@store/modules/user/types";
import { LoginPayload, SignupPayload } from "./types";

export const postLogin = async (
  loginData: LoginPayload
): Promise<UserDates> => {
  return api.post("/login", loginData).then((response) => response.data);
};

export const postSignup = async (data: SignupPayload) => {
  return api.post("/users", data).then((response) => response.data);
};
