import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as Styled from "./styles";

type OrderStatusTextProps = {
  status: OrderStatusProps;
};

export const OrderStatusText = ({ status }: OrderStatusTextProps) => {
  const textColor = (status: string) => {
    if (status === "INICIADO") {
      return theme.colors.GREEN;
    }
    if (status === "FINALIZADO") {
      return theme.colors.RED_200;
    }
    return theme.colors.ORANGE_100;
  };

  const getStatustext = (status: string) => {
    if (status === "INICIADO") {
      return "Entrega em andamento";
    }
    if (status === "FINALIZADO") {
      return "Entregue";
    }

    return "Pedido em espera";
  };

  return (
    <Styled.CustomText color={textColor(status)}>
      {getStatustext(status)}
    </Styled.CustomText>
  );
};
