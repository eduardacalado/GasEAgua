import api from "@libs/axios/api";
import { OrderDetailProps, OrderPaymentStatus, OrderProps } from "src/types/orders";
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
  openAccounts,
}: getOrderProps): Promise<OrderProps[]> => {
  const params: Record<string, string | number | boolean> = {
    page: pageNumber,
    limit: pageSize,
    scope,
  };

  if (openAccounts) {
    params.openAccounts = true;
  }

  return api
    .get("/orders", {
      params,
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

export const updateOrderPaymentState = async (
  orderId: number,
  paymentState: OrderPaymentStatus,
  options?: { remainingBalance?: number; notes?: string }
): Promise<OrderDetailProps> => {
  return api
    .put(`/orders/${orderId}/payment-state`, {
      payment_state: paymentState,
      remaining_balance: options?.remainingBalance,
      notes: options?.notes,
    })
    .then((response) => response.data);
};
