import api from "@libs/axios/api";
import { OrderPayload, StockData } from "./types";

export const postOrder = async (data: OrderPayload) => {
  return api.post("/orders", data).then((response) => response.data);
};

export const getStock = async (): Promise<StockData> => {
  return api.get("/stock").then((response) => response.data);
};