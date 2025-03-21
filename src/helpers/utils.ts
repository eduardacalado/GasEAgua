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
      (order) => order.status === status && dayjs().isSame(date, "day")
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
