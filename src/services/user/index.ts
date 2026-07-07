import api from "@libs/axios/api";
import { UserDates } from "@store/modules/user/types";

import {
  AdminUserListItem,
  GetUserAccountsParams,
  GetUsersListParams,
  ListUsersResponse,
  UserAccountProps,
  UserPayload,
} from "./types";

export const postUpdateUser = async (data: UserPayload): Promise<UserDates> => {
  return api.put("/users/profile", data).then((response) => response.data);
};

export const getUsersList = async ({
  page,
  limit,
  search,
  sort = "open_first",
}: GetUsersListParams): Promise<ListUsersResponse> => {
  return api
    .get("/users/list/1/10", {
      params: {
        page,
        limit,
        search,
        sort,
      },
    })
    .then((response) => response.data);
};

export const getUserById = async (
  userId: number,
): Promise<AdminUserListItem> => {
  return api.get(`/users/${userId}`).then((response) => response.data);
};

export const getUserAccounts = async ({
  userId,
  sort = "open_first",
}: GetUserAccountsParams): Promise<UserAccountProps[]> => {
  return api
    .get(`/users/${userId}/orders`, {
      params: { sort },
    })
    .then((response) => response.data);
};
