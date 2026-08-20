import api from "@libs/axios/api";
import { RevenueMetrics, StockItem, PaymentSettings, UpdatePaymentSettingsPayload } from "./types";
import { Addon } from "../addon/types";

export const getStockItems = async (): Promise<StockItem[]> => {
  const response = await api.get("/stock");
  return response.data.items ?? [];
};

export const updateStockItem = async (
  stockItemId: number,
  data: { quantity?: number; value?: number }
): Promise<StockItem> => {
  const response = await api.put(`/stock/${stockItemId}`, data);
  return response.data;
};

export const getAddons = async (): Promise<Addon[]> => {
  const response = await api.get("/addons");
  return response.data;
};

export const updateAddon = async (
  addonId: number,
  data: { value?: number }
): Promise<Addon> => {
  const response = await api.put(`/addons/${addonId}`, data);
  return response.data;
};

export const getRevenueMetrics = async (
  startDate?: string,
  endDate?: string
): Promise<RevenueMetrics> => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await api.get("/metrics/revenue", { params });
  return response.data;
};

export const getPaymentSettings = async (): Promise<PaymentSettings> => {
  const response = await api.get("/settings/payment");
  return response.data;
};

export const updatePaymentSettings = async (
  payload: UpdatePaymentSettingsPayload
): Promise<PaymentSettings> => {
  const response = await api.put("/settings/payment", payload);
  return response.data;
};
