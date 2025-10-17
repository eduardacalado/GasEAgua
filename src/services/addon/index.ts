import api from "@libs/axios/api";
import { Addon } from "./types";

export const getAddons = async (): Promise<Addon[]> => {
  return api.get("/addons").then((response) => response.data);
};
