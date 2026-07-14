import theme from "src/styles/theme";
import { OrderPaymentStatus } from "src/types/orders";

const paymentStateLabels: Record<OrderPaymentStatus, string> = {
  PENDENTE: "Pendente",
  PAGO: "Pago",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGO: "Parcialmente pago",
};

export function getPaymentStateLabel(paymentState: OrderPaymentStatus | string) {
  return paymentStateLabels[paymentState as OrderPaymentStatus] ?? paymentState;
}

export function getPaymentStateColor(paymentState: OrderPaymentStatus | string) {
  if (paymentState === "PAGO") {
    return theme.colors.GREEN;
  }
  if (paymentState === "VENCIDO") {
    return theme.colors.RED_100;
  }
  if (paymentState === "PARCIALMENTE_PAGO") {
    return theme.colors.ORANGE_100;
  }
  return theme.colors.ORANGE_100;
}

export function isOpenAccount(paymentState: OrderPaymentStatus | string) {
  return paymentState !== "PAGO";
}
