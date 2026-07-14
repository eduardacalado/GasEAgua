import dayjs from "dayjs";
import { formatToBRL } from "src/helpers/format-currency";
import {
  getPaymentStateColor,
  getPaymentStateLabel,
  isOpenAccount,
} from "src/helpers/payment-state";
import { UserAccountProps } from "src/services/user/types";
import * as S from "./styles";

type AccountCardProps = {
  account: UserAccountProps;
  onPress?: () => void;
};

export function AccountCard({ account, onPress }: AccountCardProps) {
  const accountIsOpen = isOpenAccount(account.payment_state);
  const paymentStateColor = getPaymentStateColor(account.payment_state);

  return (
    <S.CardSurface
      isOpenAccount={accountIsOpen}
      onPress={onPress}
      disabled={!onPress}
    >
      <S.CardHeaderRow>
        <S.AccountIdentifier>Conta #{account.id}</S.AccountIdentifier>
        <S.PaymentStateText color={paymentStateColor}>
          {getPaymentStateLabel(account.payment_state)}
        </S.PaymentStateText>
      </S.CardHeaderRow>
      <S.CardRow>
        <S.CardLabel>Atualizada em</S.CardLabel>
        <S.CardValue>
          {dayjs(account.updated_at).format("DD/MM/YYYY HH:mm")}
        </S.CardValue>
      </S.CardRow>
      {accountIsOpen && (
        <S.CardRow>
          <S.CardLabel>Saldo em aberto</S.CardLabel>
          <S.BalanceValue>{formatToBRL(account.total)}</S.BalanceValue>
        </S.CardRow>
      )}
    </S.CardSurface>
  );
}
