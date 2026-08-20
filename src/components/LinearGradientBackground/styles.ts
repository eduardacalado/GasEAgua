import { LinearGradient } from "expo-linear-gradient";
import theme from "src/styles/theme";
import styled from "styled-components/native";

type FullscreenProps = {
  isFullscreen?: boolean;
};

export const LinearGradientBackgroundStyle = styled(LinearGradient)<FullscreenProps>`
  height: ${({ isFullscreen }) => {
    if (isFullscreen) {
      return "100%";
    }

    return "370px";
  }};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${({ isFullscreen }) => {
    if (isFullscreen) {
      return "0";
    }

    return "auto";
  }};
  border-bottom-left-radius: ${({ isFullscreen }) => {
    if (isFullscreen) {
      return "0px";
    }

    return "92px";
  }};
  border-bottom-right-radius: ${({ isFullscreen }) => {
    if (isFullscreen) {
      return "0px";
    }

    return "92px";
  }};
`;

export const Container = styled.SafeAreaView<FullscreenProps>`
  flex: 1;
  background-color: ${({ isFullscreen }) => {
    if (isFullscreen) {
      return theme.colors.ORANGE_200;
    }

    return theme.colors.GRAY_100;
  }};
`;
