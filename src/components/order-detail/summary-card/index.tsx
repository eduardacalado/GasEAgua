import { OrderStatusText } from "@components/order-status-text";
import dayjs from "dayjs";
import { formatToBRL } from "src/helpers/format-currency";
import theme from "src/styles/theme";
import { OrderDetailProps, OrderPaymentStatus } from "src/types/orders";
import * as S from "../styles";

type OrderDetailSummaryCardProps = {
  orderDetail: OrderDetailProps;
  getPaymentStateLabel: (paymentState: string) => string;
};

function getPaymentStateColor(paymentState: OrderPaymentStatus) {
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

export function OrderDetailSummaryCard({
  orderDetail,
  getPaymentStateLabel,
}: OrderDetailSummaryCardProps) {
  const expirationDate = dayjs(orderDetail.updated_at)
    .add(30, "day")
    .format("DD/MM/YYYY");
  const paymentStateColor = getPaymentStateColor(orderDetail.payment_state);

  return (
    <S.SummaryCard>
      <S.SummaryHeaderRow>
        <S.OrderIdentifier>Pedido #{orderDetail.id}</S.OrderIdentifier>
        <OrderStatusText status={orderDetail.status} />
      </S.SummaryHeaderRow>

      <S.TotalBlock>
        <S.TotalLabel>Valor total</S.TotalLabel>
        <S.TotalValue>{formatToBRL(orderDetail.total)}</S.TotalValue>
      </S.TotalBlock>

      <S.Divider />

      <S.MetaGroup>
        <S.RowContainer>
          <S.RowLabel>Data do pedido</S.RowLabel>
          <S.RowValue>
            {dayjs(orderDetail.created_at).format("DD/MM/YYYY HH:mm")}
          </S.RowValue>
        </S.RowContainer>
        <S.RowContainer>
          <S.RowLabel>Última atualização</S.RowLabel>
          <S.RowValue>
            {dayjs(orderDetail.updated_at).format("DD/MM/YYYY HH:mm")}
          </S.RowValue>
        </S.RowContainer>
        <S.RowContainer>
          <S.RowLabel>Vencimento</S.RowLabel>
          <S.RowValue>{expirationDate}</S.RowValue>
        </S.RowContainer>
      </S.MetaGroup>

      <S.Divider />

      <S.RowContainer>
        <S.RowLabel>Pagamento</S.RowLabel>
        <S.RowValue style={{ color: paymentStateColor }}>
          {getPaymentStateLabel(orderDetail.payment_state)}
        </S.RowValue>
      </S.RowContainer>
    </S.SummaryCard>
  );
}
