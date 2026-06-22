import api from "@libs/axios/api";
import { AdminHomeDashboardData } from "./types";

export const getAdminHomeDashboard = async (): Promise<AdminHomeDashboardData> => {
  return api.get("/orders/dashboard").then((response) => response.data);
};
