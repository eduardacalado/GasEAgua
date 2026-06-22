import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";

export function getOrderStatusLabel(status: OrderStatusProps): string {
  if (status === "INICIADO") {
    return "Entrega em andamento";
  }
  if (status === "FINALIZADO") {
    return "Entregue";
  }
  if (status === "CANCELADO") {
    return "Cancelado";
  }
  return "Pedido em espera";
}

export function getOrderStatusFilterLabel(status: OrderStatusProps): string {
  if (status === "INICIADO") {
    return "Em andamento";
  }
  if (status === "FINALIZADO") {
    return "Entregue";
  }
  if (status === "CANCELADO") {
    return "Cancelado";
  }
  return "Em espera";
}

export function getOrderStatusColor(status: OrderStatusProps): string {
  if (status === "INICIADO") {
    return theme.colors.BLUE;
  }
  if (status === "FINALIZADO") {
    return theme.colors.GREEN;
  }
  if (status === "CANCELADO") {
    return theme.colors.RED_100;
  }
  return theme.colors.ORANGE_100;
}

export function getOrderStatusSurfaceColor(status: OrderStatusProps): string {
  if (status === "INICIADO") {
    return "#E8F4FD";
  }
  if (status === "FINALIZADO") {
    return "#E8F8EE";
  }
  if (status === "CANCELADO") {
    return "#FEE8E8";
  }
  return "#FFF4E6";
}

export type OrderStatusOption = {
  label: string;
  value: OrderStatusProps;
};

export const ORDER_STATUS_OPTIONS: OrderStatusOption[] = [
  { label: getOrderStatusLabel("PENDENTE"), value: "PENDENTE" },
  { label: getOrderStatusLabel("INICIADO"), value: "INICIADO" },
  { label: getOrderStatusLabel("FINALIZADO"), value: "FINALIZADO" },
  { label: getOrderStatusLabel("CANCELADO"), value: "CANCELADO" },
];

export const ORDER_STATUS_FILTER_OPTIONS: OrderStatusOption[] = [
  { label: getOrderStatusFilterLabel("PENDENTE"), value: "PENDENTE" },
  { label: getOrderStatusFilterLabel("INICIADO"), value: "INICIADO" },
  { label: getOrderStatusFilterLabel("FINALIZADO"), value: "FINALIZADO" },
  { label: getOrderStatusFilterLabel("CANCELADO"), value: "CANCELADO" },
];
