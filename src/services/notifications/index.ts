import api from "@libs/axios/api";

export const postNotificationToken = async (token: string): Promise<void> => {
  await api.post("/users/notifications/token/register/admin", { token });
};

export const deleteNotificationToken = async (token: string): Promise<void> => {
  await api.delete("/users/notifications/token", { data: { token } });
};

export const postBroadcastToUsers = async (payload: {
  title: string;
  message: string;
}): Promise<void> => {
  await api.post("/notifications/send/users", payload);
};
