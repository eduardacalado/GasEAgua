import theme from "src/styles/theme";
import styled from "styled-components/native";

export const TimelineContainer = styled.View`
  gap: ${theme.size.m3};
`;

export const TransactionItem = styled.View`
  background-color: ${theme.colors.GRAY_100};
  border-radius: 10px;
  padding: ${theme.size.m4};
  gap: ${theme.size.m2};
`;

export const TransactionHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TransactionTypeText = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const TransactionAmount = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.extrabold};
`;

export const TransactionMetaText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const EmptyHistoryText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  text-align: center;
  padding: ${theme.size.m4};
`;
