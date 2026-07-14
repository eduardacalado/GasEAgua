import theme from "src/styles/theme";
import styled from "styled-components/native";

export const CardSurface = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  background-color: ${theme.colors.WHITE};
  border-radius: 12px;
  padding: ${theme.size.m5};
  gap: ${theme.size.m3};
  width: 100%;
  border-top-width: 4px;
  border-top-color: ${theme.colors.ORANGE_300};
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

export const CustomerName = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.extrabold};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const RowLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  flex: 1;
`;

export const RowValue = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
  text-align: right;
`;

export const OpenBalanceValue = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.extrabold};
`;
