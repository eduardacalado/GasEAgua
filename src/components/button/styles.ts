import theme from "src/styles/theme";
import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity<{ color: string }>`
  padding: ${theme.font.size.m3};
  align-items: center;
  justify-content: center;
  border-radius: ${theme.font.size.m6};
  background-color: ${({ color }) => color};
  margin-bottom: ${theme.size.m6};
  width: 100%;
`;
