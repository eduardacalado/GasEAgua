import api from "@libs/axios/api";

import {
  GetUserTransactionsParams,
  PaginatedTransactionsResponse,
  RegisterPaymentPayload,
  RegisterPaymentResponse,
} from "./types";

export const getUserTransactions = async ({
  userId,
  page = 1,
  limit = 20,
  sort = "date_desc",
  orderId,
}: GetUserTransactionsParams): Promise<PaginatedTransactionsResponse> => {
  return api
    .get(`/users/${userId}/transactions`, {
      params: {
        page,
        limit,
        sort,
        order_id: orderId,
      },
    })
    .then((response) => response.data);
};

export const registerPayment = async (
  paymentPayload: RegisterPaymentPayload
): Promise<RegisterPaymentResponse> => {
  return api
    .post("/transactions", paymentPayload)
    .then((response) => response.data);
};
