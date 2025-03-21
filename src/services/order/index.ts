import api from "@libs/axios/api";
import { OrderProps } from "src/types/orders";
import { getOrderProps, OrderPayload, StockData } from "./types";

export const postOrder = async (data: OrderPayload) => {
  return api.post("/orders", data).then((response) => response.data);
};

export const getStock = async (): Promise<StockData> => {
  return api.get("/stock").then((response) => response.data);
};

export const getOrders = async (): Promise<OrderProps[]> => {
  return api.get("/orders/list/all").then((response) => response.data);
};

export const getUserOrders = async ({
  pageNumber,
  pageSize,
}: getOrderProps): Promise<OrderProps[]> => {
  return api
    .get(`/orders/user/list/${pageNumber}/${pageSize}`)
    .then((response) => response.data.items);
};
