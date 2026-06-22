import api from "@libs/axios/api";
import { OrderDetailProps, OrderProps } from "src/types/orders";
import { ConcludeOrderPayload, getOrderProps, OrderPayload, StockData } from "./types";

export const postOrder = async (data: OrderPayload) => {
  return api.post("/orders", data).then((response) => response.data);
};

export const getStock = async (): Promise<StockData> => {
  return api.get("/stock").then((response) => response.data);
};

export const getOrders = async ({
  pageNumber,
  pageSize,
  scope = "me",
}: getOrderProps): Promise<OrderProps[]> => {
  return api
    .get("/orders", {
      params: {
        page: pageNumber,
        limit: pageSize,
        scope,
      },
    })
    .then((response) => {
      return response.data.items;
    });
};

export const getOrderById = async (orderId: number): Promise<OrderDetailProps> => {
  return api.get(`/orders/${orderId}`).then((response) => response.data);
};

export const concludeOrder = async ({
  orderId,
  status,
}: ConcludeOrderPayload) => {
  return api
    .put(`/orders/${orderId}/conclude`, { status })
    .then((response) => response.data);
};
