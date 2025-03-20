import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as Styled from "./styles";

type OrderStatusTextProps = {
  status: OrderStatusProps;
};

export const OrderStatusText = ({ status }: OrderStatusTextProps) => {
  const textColor = (status: string) => {
    if (status === "APROVADO") {
      return theme.colors.GREEN;
    } else if (status === "REPROVADO") {
      return theme.colors.RED_200;
    } else {
      return theme.colors.ORANGE_100;
    }
  };

  return (
    <Styled.CustomText color={textColor(status)}>{status}</Styled.CustomText>
  );
};
