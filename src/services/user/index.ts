import api from "@libs/axios/api";
import { UserDates } from "@store/modules/user/types";
import { UserPayload } from "./types";

export const postUpdateUser = async (data: UserPayload): Promise<UserDates> => {
  return api.put("/users/profile", data).then((response) => response.data);
};
