import { AccountSummary } from "src/services/user/types";
import { formatToBRL } from "src/helpers/format-currency";
import * as S from "./styles";

type UserCardProps = {
  username: string;
  telephone: string;
  accountSummary: AccountSummary;
  onPress?: () => void;
};

export function UserCard({
  username,
  telephone,
  accountSummary,
  onPress,
}: UserCardProps) {
  return (
    <S.CardSurface onPress={onPress} disabled={!onPress}>
      <S.CustomerName>{username}</S.CustomerName>
      <S.RowContainer>
        <S.RowLabel>Telefone</S.RowLabel>
        <S.RowValue>{telephone}</S.RowValue>
      </S.RowContainer>
      <S.RowContainer>
        <S.RowLabel>Saldo total em aberto</S.RowLabel>
        <S.OpenBalanceValue>
          {formatToBRL(accountSummary.openBalance)}
        </S.OpenBalanceValue>
      </S.RowContainer>
      <S.RowContainer>
        <S.RowLabel>Contas em aberto</S.RowLabel>
        <S.RowValue>{accountSummary.openAccountsCount}</S.RowValue>
      </S.RowContainer>
      <S.RowContainer>
        <S.RowLabel>Contas vencidas</S.RowLabel>
        <S.RowValue>{accountSummary.overdueAccountsCount}</S.RowValue>
      </S.RowContainer>
    </S.CardSurface>
  );
}
