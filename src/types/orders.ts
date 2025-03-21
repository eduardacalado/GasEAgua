import { AddressDates } from "./address";

export type OrderStatusProps = "INICIADO" | "PENDENTE" | "FINALIZADO";

export type OrderProps = {
  id: number;
  user_id: number;
  status: OrderStatusProps;
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
