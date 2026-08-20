import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { formatToBRL } from "src/helpers/format-currency";
import { getIntendedPaymentMethodLabel } from "src/helpers/intended-payment-method";
import {
  getOrderTransactionAmountColor,
  getOrderTransactionTypeLabel,
} from "src/helpers/order-transaction";
import theme from "src/styles/theme";
import { OrderDetailProps, OrderTransactionDetail } from "src/types/orders";
import * as S from "../styles";

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

type OrderDetailSectionProps = {
  orderDetail: OrderDetailProps;
};

export function OrderDetailCustomerSection({
  orderDetail,
}: OrderDetailSectionProps) {
  if (!orderDetail.user) {
    return null;
  }

  return (
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
  );
}

export function OrderDetailAddressSection({
  orderDetail,
}: OrderDetailSectionProps) {
  const addressParts = [
    orderDetail.address.local,
    orderDetail.address.reference,
    orderDetail.address.street,
    orderDetail.address.number,
  ].filter(Boolean);

  return (
    <S.SectionCard>
      <SectionHeader icon="map-pin" title="Endereço" />
      <S.AddressBox>
        <S.AddressText>{addressParts.join(" · ")}</S.AddressText>
      </S.AddressBox>
    </S.SectionCard>
  );
}

export function OrderDetailItemsSection({
  orderDetail,
}: OrderDetailSectionProps) {
  if (!orderDetail.orderItems || orderDetail.orderItems.length === 0) {
    return null;
  }

  return (
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
  );
}

export function OrderDetailAddonsSection({
  orderDetail,
}: OrderDetailSectionProps) {
  if (!orderDetail.orderAddons || orderDetail.orderAddons.length === 0) {
    return null;
  }

  return (
    <S.SectionCard>
      <SectionHeader icon="plus-circle" title="Adicionais" />
      <S.ListGroup>
        {orderDetail.orderAddons.map((orderAddon) => (
          <S.ListRow key={orderAddon.id}>
            <S.RowLabel>
              {orderAddon.addon?.name ?? orderAddon.type}
            </S.RowLabel>
            <S.RowValue>
              {orderAddon.quantity}x {formatToBRL(orderAddon.unitValue)}
            </S.RowValue>
          </S.ListRow>
        ))}
      </S.ListGroup>
    </S.SectionCard>
  );
}

export function OrderDetailIntendedPaymentSection({
  orderDetail,
}: OrderDetailSectionProps) {
  const intendedPaymentMethodLabel = getIntendedPaymentMethodLabel(
    orderDetail.intended_payment_method
  );

  return (
    <S.SectionCard>
      <SectionHeader icon="dollar-sign" title="Como pretende pagar" />
      <S.ListRow>
        <S.RowLabel>Forma pretendida</S.RowLabel>
        <S.RowValue>{intendedPaymentMethodLabel}</S.RowValue>
      </S.ListRow>
    </S.SectionCard>
  );
}

function OrderTransactionHistoryItem({
  transaction,
}: {
  transaction: OrderTransactionDetail;
}) {
  const typeLabel = getOrderTransactionTypeLabel(transaction.type);
  const amountColor = getOrderTransactionAmountColor(transaction.type);
  const formattedAmount = formatToBRL(transaction.amount);
  const formattedDate = dayjs(transaction.created_at).format(
    "DD/MM/YYYY HH:mm"
  );
  const hasBalanceChange = transaction.old_value !== transaction.new_value;
  const formattedOldValue = formatToBRL(transaction.old_value);
  const formattedNewValue = formatToBRL(transaction.new_value);

  let balanceChangeLabel: string | undefined;
  if (hasBalanceChange) {
    balanceChangeLabel = `Saldo ${formattedOldValue} → ${formattedNewValue}`;
  }

  let paymentMethodLabel: string | undefined;
  if (transaction.payment_method) {
    paymentMethodLabel = getIntendedPaymentMethodLabel(
      transaction.payment_method
    );
  }

  const transactionNotes = transaction.notes?.trim();

  return (
    <S.TransactionHistoryItem>
      <S.TransactionHistoryHeader>
        <S.TransactionHistoryType>{typeLabel}</S.TransactionHistoryType>
        <S.TransactionHistoryAmount color={amountColor}>
          {formattedAmount}
        </S.TransactionHistoryAmount>
      </S.TransactionHistoryHeader>
      <S.TransactionHistoryMeta>{formattedDate}</S.TransactionHistoryMeta>
      {balanceChangeLabel && (
        <S.TransactionHistoryMeta>{balanceChangeLabel}</S.TransactionHistoryMeta>
      )}
      {paymentMethodLabel && (
        <S.TransactionHistoryMeta>
          Método: {paymentMethodLabel}
        </S.TransactionHistoryMeta>
      )}
      {transactionNotes && (
        <S.TransactionHistoryMeta>{transactionNotes}</S.TransactionHistoryMeta>
      )}
    </S.TransactionHistoryItem>
  );
}

export function OrderDetailTransactionsSection({
  orderDetail,
}: OrderDetailSectionProps) {
  if (!orderDetail.transactions || orderDetail.transactions.length === 0) {
    return null;
  }

  return (
    <S.SectionCard>
      <SectionHeader icon="credit-card" title="Histórico" />
      <S.TransactionHistoryList>
        {orderDetail.transactions.map((transaction) => (
          <OrderTransactionHistoryItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </S.TransactionHistoryList>
    </S.SectionCard>
  );
}
