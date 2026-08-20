export type StockItem = {
  id: number;
  name: string;
  type: string;
  quantity: number;
  value: number;
  created_at: string;
  updated_at: string;
};

export type RevenueMetrics = {
  startDate: string;
  endDate: string;
  ordersCount: number;
  paidRevenue: number;
  pendingRevenue: number;
  itemsByType: Record<string, number>;
};

export type PaymentSettings = {
  id: number;
  pix_key: string;
  recipient_name: string;
  updated_at: string;
};

export type UpdatePaymentSettingsPayload = {
  pix_key: string;
  recipient_name: string;
};
