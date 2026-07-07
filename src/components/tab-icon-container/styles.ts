import theme from "src/styles/theme";
import styled from "styled-components/native";

type TabIconContainerProps = {
  focused: boolean;
};

export const Container = styled.View<TabIconContainerProps>`
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 32px;
  border-radius: 10px;
  background-color: ${({ focused }) =>
    focused ? theme.colors.ORANGE_200 : "transparent"};
`;
