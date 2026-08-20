import { StockItem } from "src/services/management/types";

// TODO: tornar essa quantidade personalizável via API
export const OUT_OF_STOCK_QUANTITY = 0;
export const CRITICAL_STOCK_QUANTITY = 1;
export const LOW_STOCK_QUANTITY_THRESHOLD = 20;

export function hasStockQuantityAlert(quantity: number) {
  return quantity <= LOW_STOCK_QUANTITY_THRESHOLD;
}

export function getStockQuantityAlertLabel(quantity: number) {
  if (quantity <= OUT_OF_STOCK_QUANTITY) {
    return "Sem estoque";
  }

  if (quantity <= CRITICAL_STOCK_QUANTITY) {
    return "Estoque crítico";
  }

  if (quantity <= LOW_STOCK_QUANTITY_THRESHOLD) {
    return "Estoque baixo";
  }

  return null;
}

export function getStockAlertBannerMessage(stockAlertItems: StockItem[]) {
  if (stockAlertItems.length !== 1) {
    return `${stockAlertItems.length} produtos com estoque baixo`;
  }

  const stockAlertItem = stockAlertItems[0];

  if (stockAlertItem.quantity <= OUT_OF_STOCK_QUANTITY) {
    return `${stockAlertItem.name} sem estoque (${stockAlertItem.quantity} un.)`;
  }

  if (stockAlertItem.quantity <= CRITICAL_STOCK_QUANTITY) {
    return `${stockAlertItem.name} com estoque crítico (${stockAlertItem.quantity} un.)`;
  }

  return `${stockAlertItem.name} com estoque baixo (${stockAlertItem.quantity} un.)`;
}
