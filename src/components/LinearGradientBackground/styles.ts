import { LinearGradient } from "expo-linear-gradient";
import theme from "src/styles/theme";
import styled from "styled-components/native";

export const LinearGradientBackgroundStyle = styled(LinearGradient)`
  height: 370px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom-left-radius: 92px;
  border-bottom-right-radius: 92px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.GRAY_100};
`;
