import theme from "src/styles/theme";
import { OrderPaymentStatus } from "src/types/orders";

const paymentStateLabels: Record<OrderPaymentStatus, string> = {
  [OrderPaymentStatus.PENDENTE]: "Pendente",
  [OrderPaymentStatus.PAGO]: "Pago",
  [OrderPaymentStatus.VENCIDO]: "Vencido",
  [OrderPaymentStatus.PARCIALMENTE_PAGO]: "Parcialmente pago",
};

const paymentStateColors: Record<OrderPaymentStatus, string> = {
  [OrderPaymentStatus.PENDENTE]: theme.colors.ORANGE_100,
  [OrderPaymentStatus.PAGO]: theme.colors.GREEN,
  [OrderPaymentStatus.VENCIDO]: theme.colors.RED_100,
  [OrderPaymentStatus.PARCIALMENTE_PAGO]: theme.colors.ORANGE_100,
};

const paymentStateSurfaceColors: Record<OrderPaymentStatus, string> = {
  [OrderPaymentStatus.PENDENTE]: "#FFF4E6",
  [OrderPaymentStatus.PAGO]: "#E8F8EE",
  [OrderPaymentStatus.VENCIDO]: "#FEE8E8",
  [OrderPaymentStatus.PARCIALMENTE_PAGO]: "#FFF8E1",
};

export function getPaymentStateLabel(paymentState: OrderPaymentStatus | string) {
  const paymentStateLabel =
    paymentStateLabels[paymentState as OrderPaymentStatus];

  if (paymentStateLabel) {
    return paymentStateLabel;
  }

  return paymentState;
}

export function getPaymentStateColor(paymentState: OrderPaymentStatus | string) {
  const paymentStateColor =
    paymentStateColors[paymentState as OrderPaymentStatus];

  if (paymentStateColor) {
    return paymentStateColor;
  }

  return theme.colors.ORANGE_100;
}

export function getPaymentStateSurfaceColor(
  paymentState: OrderPaymentStatus | string
) {
  const paymentStateSurfaceColor =
    paymentStateSurfaceColors[paymentState as OrderPaymentStatus];

  if (paymentStateSurfaceColor) {
    return paymentStateSurfaceColor;
  }

  return paymentStateSurfaceColors[OrderPaymentStatus.PENDENTE];
}

export function isOpenAccount(paymentState: OrderPaymentStatus | string) {
  return paymentState !== OrderPaymentStatus.PAGO;
}
