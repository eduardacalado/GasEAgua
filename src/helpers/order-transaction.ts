import theme from "src/styles/theme";
import { OrderTransactionType } from "src/types/orders";

const orderTransactionTypeLabels: Record<OrderTransactionType, string> = {
  [OrderTransactionType.PAYMENT]: "Pagamento",
  [OrderTransactionType.INTEREST]: "Juros",
  [OrderTransactionType.ADJUSTMENT]: "Ajuste",
};

export function getOrderTransactionTypeLabel(
  transactionType: OrderTransactionType | string
) {
  const orderTransactionTypeLabel =
    orderTransactionTypeLabels[transactionType as OrderTransactionType];

  if (orderTransactionTypeLabel) {
    return orderTransactionTypeLabel;
  }

  return transactionType;
}

export function getOrderTransactionAmountColor(
  transactionType: OrderTransactionType | string
) {
  if (transactionType === OrderTransactionType.PAYMENT) {
    return theme.colors.GREEN;
  }

  return theme.colors.ORANGE_100;
}
