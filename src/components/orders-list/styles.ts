import theme from "src/styles/theme";
import styled from "styled-components/native";

export const CardArea = styled.View`
  flex: 1;
`;

export const listContentContainerStyle = {
  flexGrow: 1,
};

export const EmptyStateCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const EmptyStateIconBadge = styled.View<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const EmptyStateText = styled.Text`
  flex: 1;
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.medium};
`;
