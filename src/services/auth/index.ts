import api from "@libs/axios/api";
import { UserDates } from "@store/modules/user/types";
import { LoginPayload } from "./types";

export const postLogin = async (
  loginData: LoginPayload
): Promise<UserDates> => {
  return api.post("/login", loginData).then((response) => response.data);
};
