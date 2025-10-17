import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../styles/theme";

interface OrderTotalProps {
  totalItems: number;
  totalValue: string;
}

export function OrderTotal({ totalItems, totalValue }: OrderTotalProps) {
  return (
    <CashContainer
      colors={["#DB1A00", "#ED4200", "#FF6A00"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <TotalItems>{totalItems} Items</TotalItems>
      <TotalCash>Total {totalValue}</TotalCash>
    </CashContainer>
  );
}

const CashContainer = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${theme.size.m4};
  align-items: center;
  width: 100%;
  padding: ${theme.font.size.m1};
`;

const TotalItems = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

const TotalCash = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;
