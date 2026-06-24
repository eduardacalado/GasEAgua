import dayjs from "dayjs";
import { OrderProps } from "src/types/orders";

type OrdersFilterProps = {
  orders: OrderProps[];
  status?: string;
  date?: Date;
};

export const ordersFilter = ({ orders, status, date }: OrdersFilterProps) => {
  if (date && status) {
    return orders.filter(
      (order) =>
        order.status === status &&
        dayjs(order.updated_at).isSame(date, "day")
    );
  }

  if (date) {
    return orders.filter((order) =>
      dayjs(order.updated_at).isSame(date, "day")
    );
  }

  if (status) {
    return orders.filter((order) => order.status === status);
  }

  return orders;
};

export const NumberOrZero = (value?: unknown): number => {
  const n = Number(value);
  if (!Number.isFinite(n) || Number.isNaN(n)) return 0;
  return n;
};
