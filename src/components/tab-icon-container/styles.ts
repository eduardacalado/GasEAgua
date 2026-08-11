import theme from "src/styles/theme";
import styled from "styled-components/native";

type TabIconContainerProps = {
  focused: boolean;
};

export const Container = styled.View<TabIconContainerProps>`
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ focused }) =>
    focused ? theme.colors.ORANGE_50 : "transparent"};
`;
