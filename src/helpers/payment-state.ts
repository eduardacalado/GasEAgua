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

export function getPaymentStateSurfaceColor(paymentState: OrderPaymentStatus | string) {
  if (paymentState === "PAGO") {
    return "#E8F8EE";
  }
  if (paymentState === "VENCIDO") {
    return "#FEE8E8";
  }
  if (paymentState === "PARCIALMENTE_PAGO") {
    return "#FFF8E1";
  }
  return "#FFF4E6";
}

export function isOpenAccount(paymentState: OrderPaymentStatus | string) {
  return paymentState !== "PAGO";
}
