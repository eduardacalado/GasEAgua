import dayjs from "dayjs";
import { formatToBRL } from "src/helpers/format-currency";
import theme from "src/styles/theme";
import { UserAccountTransactionHistoryItem } from "src/services/transactions/types";
import * as S from "./styles";

type AccountTransactionHistoryProps = {
  transactions: UserAccountTransactionHistoryItem[];
};

function getTransactionTypeLabel(transactionType: string) {
  if (transactionType === "PAYMENT") {
    return "Pagamento";
  }
  if (transactionType === "INTEREST") {
    return "Débito / Juros";
  }
  return "Ajuste";
}

function getTransactionAmountColor(transactionType: string) {
  if (transactionType === "PAYMENT") {
    return theme.colors.GREEN;
  }
  return theme.colors.ORANGE_100;
}

export function AccountTransactionHistory({
  transactions,
}: AccountTransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <S.EmptyHistoryText>Nenhuma movimentação encontrada</S.EmptyHistoryText>
    );
  }

  return (
    <S.TimelineContainer>
      {transactions.map((transaction) => (
        <S.TransactionItem key={transaction.id}>
          <S.TransactionHeaderRow>
            <S.TransactionTypeText>
              {getTransactionTypeLabel(transaction.type)}
            </S.TransactionTypeText>
            <S.TransactionAmount color={getTransactionAmountColor(transaction.type)}>
              {formatToBRL(transaction.amount)}
            </S.TransactionAmount>
          </S.TransactionHeaderRow>
          <S.TransactionMetaText>
            {dayjs(transaction.created_at).format("DD/MM/YYYY HH:mm")}
          </S.TransactionMetaText>
          <S.TransactionMetaText>Conta #{transaction.order_id}</S.TransactionMetaText>
          {transaction.payment_method && (
            <S.TransactionMetaText>
              Método: {transaction.payment_method}
            </S.TransactionMetaText>
          )}
          {transaction.notes && (
            <S.TransactionMetaText>{transaction.notes}</S.TransactionMetaText>
          )}
        </S.TransactionItem>
      ))}
    </S.TimelineContainer>
  );
}
