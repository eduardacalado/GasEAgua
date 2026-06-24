import { getOrderStatusColor, getOrderStatusLabel } from "src/helpers/order-status";
import { OrderStatusProps } from "src/types/orders";
import * as Styled from "./styles";

type OrderStatusTextProps = {
  status: OrderStatusProps;
};

export const OrderStatusText = ({ status }: OrderStatusTextProps) => {
  return (
    <Styled.CustomText color={getOrderStatusColor(status)}>
      {getOrderStatusLabel(status)}
    </Styled.CustomText>
  );
};
