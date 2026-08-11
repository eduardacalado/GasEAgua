import api from "@libs/axios/api";
import { OrderProps, OrderStatusProps } from "src/types/orders";

import { DeliveryDaySummary } from "./types";

export const getDeliveryDaySummary = async (): Promise<DeliveryDaySummary> => {
  return api.get("/orders/delivery/summary").then((response) => response.data);
};

export const getDeliveryOrders = async ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}): Promise<OrderProps[]> => {
  return api
    .get("/orders", {
      params: {
        page: pageNumber,
        limit: pageSize,
        scope: "all",
      },
    })
    .then((response) => response.data.items);
};

export const updateDeliveryOrderStatus = async (
  orderId: number,
  status: OrderStatusProps,
) => {
  return api
    .put(`/orders/${orderId}/conclude`, { status })
    .then((response) => response.data);
};
