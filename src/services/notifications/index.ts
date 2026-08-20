import api from "@libs/axios/api";

export const postNotificationToken = async (token: string): Promise<void> => {
  await api.post("/users/notifications/token/register/admin", { token });
};
