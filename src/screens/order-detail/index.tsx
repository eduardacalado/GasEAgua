import { CustomHeader } from "@components/custom-header";
import { OrderStatusText } from "@components/order-status-text";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { formatToBRL } from "src/helpers/format-currency";
import theme from "src/styles/theme";
import { OrderPaymentStatus } from "src/types/orders";
import { OrderStatusSelect } from "./order-status-select";
import { useOrderDetail } from "./use-order-detail";
import * as S from "./styles";

type OrderDetailRouteParams = {
  orderDetail: {
    orderId: number;
  };
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

type SectionHeaderProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  title: string;
};

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <S.SectionTitleRow>
      <S.SectionAccent />
      <Feather name={icon} size={18} color={theme.colors.GRAY_300} />
      <S.SectionTitle>{title}</S.SectionTitle>
    </S.SectionTitleRow>
  );
}

export function OrderDetailScreen() {
  const route = useRoute<RouteProp<OrderDetailRouteParams, "orderDetail">>();
  const { orderId } = route.params;

  const {
    orderDetail,
    isLoading,
    isUpdatingStatus,
    isAdminView,
    orderStatusOptions,
    updateOrderStatus,
    getPaymentStateLabel,
  } = useOrderDetail(orderId);

  if (isLoading || !orderDetail) {
    return (
      <LinearGradientBackground>
        <S.SafeAreaViewContainer>
          <StatusBar style="light" />
          <CustomHeader />
          <ActivityIndicator size="large" color={theme.colors.WHITE} />
        </S.SafeAreaViewContainer>
      </LinearGradientBackground>
    );
  }

  const expirationDate = dayjs(orderDetail.updated_at)
    .add(30, "day")
    .format("DD/MM/YYYY");

  const addressParts = [
    orderDetail.address.local,
    orderDetail.address.reference,
    orderDetail.address.street,
    orderDetail.address.number,
  ].filter(Boolean);

  const paymentStateColor = getPaymentStateColor(orderDetail.payment_state);

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />
        <CustomHeader />
        {isAdminView && (
          <S.StatusActionCard>
            <S.StatusActionLabel>Alterar status do pedido</S.StatusActionLabel>
            <OrderStatusSelect
              value={orderDetail.status}
              options={orderStatusOptions}
              disabled={isUpdatingStatus}
              onChange={updateOrderStatus}
            />
          </S.StatusActionCard>
        )}
        <S.ScrollViewContainer>
          <S.ContentContainer>
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

            {isAdminView && orderDetail.user && (
              <S.SectionCard>
                <SectionHeader icon="user" title="Cliente" />
                <S.ListGroup>
                  <S.ListRow>
                    <S.RowLabel>Nome</S.RowLabel>
                    <S.RowValue>{orderDetail.user.username}</S.RowValue>
                  </S.ListRow>
                  <S.ListRow>
                    <S.RowLabel>Telefone</S.RowLabel>
                    <S.RowValue>{orderDetail.user.telephone}</S.RowValue>
                  </S.ListRow>
                </S.ListGroup>
              </S.SectionCard>
            )}

            <S.SectionCard>
              <SectionHeader icon="map-pin" title="Endereço" />
              <S.AddressBox>
                <S.AddressText>{addressParts.join(" · ")}</S.AddressText>
              </S.AddressBox>
            </S.SectionCard>

            {orderDetail.orderItems && orderDetail.orderItems.length > 0 && (
              <S.SectionCard>
                <SectionHeader icon="package" title="Itens" />
                <S.ListGroup>
                  {orderDetail.orderItems.map((orderItem) => (
                    <S.ListRow key={orderItem.id}>
                      <S.RowLabel>
                        {orderItem.stock?.name ?? orderItem.type}
                      </S.RowLabel>
                      <S.RowValue>
                        {orderItem.quantity}x {formatToBRL(orderItem.unitValue)}
                      </S.RowValue>
                    </S.ListRow>
                  ))}
                </S.ListGroup>
              </S.SectionCard>
            )}

            {orderDetail.orderAddons && orderDetail.orderAddons.length > 0 && (
              <S.SectionCard>
                <SectionHeader icon="plus-circle" title="Adicionais" />
                <S.ListGroup>
                  {orderDetail.orderAddons.map((orderAddon) => (
                    <S.ListRow key={orderAddon.id}>
                      <S.RowLabel>
                        {orderAddon.addon?.name ?? orderAddon.type}
                      </S.RowLabel>
                      <S.RowValue>
                        {orderAddon.quantity}x{" "}
                        {formatToBRL(orderAddon.unitValue)}
                      </S.RowValue>
                    </S.ListRow>
                  ))}
                </S.ListGroup>
              </S.SectionCard>
            )}

            {orderDetail.transactions &&
              orderDetail.transactions.length > 0 && (
                <S.SectionCard>
                  <SectionHeader icon="credit-card" title="Pagamentos" />
                  <S.ListGroup>
                    {orderDetail.transactions.map((transaction) => (
                      <S.ListRow key={transaction.id}>
                        <S.RowLabel>
                          {dayjs(transaction.created_at).format("DD/MM/YYYY")}
                        </S.RowLabel>
                        <S.RowValue style={{ color: theme.colors.GREEN }}>
                          {formatToBRL(transaction.value)}
                        </S.RowValue>
                      </S.ListRow>
                    ))}
                  </S.ListGroup>
                </S.SectionCard>
              )}
          </S.ContentContainer>
        </S.ScrollViewContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
