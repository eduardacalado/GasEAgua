import theme from "src/styles/theme";
import { OrderTransactionType } from "src/types/orders";

export function getOrderTransactionTypeLabel(
  transactionType: OrderTransactionType | string
) {
  if (transactionType === "PAYMENT") {
    return "Pagamento";
  }

  if (transactionType === "INTEREST") {
    return "Juros";
  }

  if (transactionType === "ADJUSTMENT") {
    return "Ajuste";
  }

  return transactionType;
}

export function getOrderTransactionAmountColor(
  transactionType: OrderTransactionType | string
) {
  if (transactionType === "PAYMENT") {
    return theme.colors.GREEN;
  }

  return theme.colors.ORANGE_100;
}
