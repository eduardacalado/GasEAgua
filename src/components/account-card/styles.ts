import theme from "src/styles/theme";
import styled from "styled-components/native";

export const CardSurface = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})<{ isOpenAccount: boolean }>`
  background-color: ${theme.colors.WHITE};
  border-radius: 12px;
  padding: ${theme.size.m4};
  gap: ${theme.size.m2};
  border-width: 2px;
  border-color: ${({ isOpenAccount }) =>
    isOpenAccount ? theme.colors.ORANGE_200 : theme.colors.GRAY_200};
  opacity: ${({ isOpenAccount }) => (isOpenAccount ? 1 : 0.85)};
`;

export const CardHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AccountIdentifier = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const PaymentStateText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const CardValue = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const BalanceValue = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.extrabold};
`;
