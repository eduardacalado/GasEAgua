import { AddressDates } from "./address";

export type OrderStatusProps =
  | "INICIADO"
  | "PENDENTE"
  | "FINALIZADO"
  | "CANCELADO";

export type OrderPaymentStatus =
  | "PENDENTE"
  | "PAGO"
  | "VENCIDO"
  | "PARCIALMENTE_PAGO";

export type IntendedPaymentMethod =
  | "DINHEIRO"
  | "PIX"
  | "CARTAO"
  | "TRANSFERENCIA";

export type OrderItemDetail = {
  id: number;
  quantity: number;
  unitValue: number;
  totalValue: number;
  type: string;
  stock?: {
    id: number;
    name: string;
    type: string;
    value: number;
  };
};

export type OrderAddonDetail = {
  id: number;
  quantity: number;
  unitValue: number;
  totalValue: number;
  type: string;
  addon?: {
    id: number;
    name: string;
    type: string;
    value: number;
  };
};

export type OrderTransactionDetail = {
  id: number;
  value: number;
  created_at: string;
};

export type OrderProps = {
  id: number;
  user_id: number;
  status: OrderStatusProps;
  payment_state: OrderPaymentStatus;
  gasAmount: number;
  waterAmount: number;
  created_at: Date;
  updated_at: Date;
  total: number;
  address: AddressDates;
  user?: {
    username: string;
    telephone: string;
  };
};

export type OrderDetailProps = OrderProps & {
  intended_payment_method?: IntendedPaymentMethod | null;
  orderItems?: OrderItemDetail[];
  orderAddons?: OrderAddonDetail[];
  transactions?: OrderTransactionDetail[];
};
