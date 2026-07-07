import { OrderPaymentStatus } from "src/types/orders";

export type TransactionSortOption =
  | "date_desc"
  | "date_asc"
  | "amount_desc"
  | "amount_asc";

export type PaymentMethod = "DINHEIRO" | "PIX" | "CARTAO" | "TRANSFERENCIA";

export type UserAccountTransactionHistoryItem = {
  id: number;
  order_id: number;
  type: "PAYMENT" | "INTEREST" | "ADJUSTMENT";
  amount: number;
  old_value: number;
  new_value: number;
  payment_method?: PaymentMethod;
  notes?: string;
  created_at: string;
  updated_at: string;
  accountPaymentState: OrderPaymentStatus;
};

export type PaginatedTransactionsResponse = {
  items: UserAccountTransactionHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type GetUserTransactionsParams = {
  userId: number;
  page?: number;
  limit?: number;
  sort?: TransactionSortOption;
  orderId?: number;
};

export type RegisterPaymentPayload = {
  order_id: number;
  amount_paid: number;
  payment_method: PaymentMethod;
  notes?: string;
};

export type RegisterPaymentResponse = {
  message: string;
  order: {
    id: number;
    payment_state: OrderPaymentStatus;
    total: number;
  };
};
