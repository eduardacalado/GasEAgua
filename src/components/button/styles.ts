import { LinearGradient } from "expo-linear-gradient";
import theme from "src/styles/theme";
import styled from "styled-components/native";
import { ButtonVariant } from "./types";

type VariantProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  isTertiary?: boolean;
};

export const TouchableArea = styled.TouchableOpacity<VariantProps>`
  align-self: ${({ isTertiary }) => (isTertiary ? "center" : "stretch")};
`;

export const PrimaryBackground = styled(LinearGradient)`
  min-height: 52px;
  padding: ${theme.size.m4};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SurfaceBackground = styled.View<VariantProps>`
  min-height: ${({ variant }) => (variant === "tertiary" ? "auto" : "52px")};
  padding: ${({ variant }) =>
    variant === "tertiary" ? `${theme.size.m2} 0` : theme.size.m4};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
  width: ${({ variant }) => (variant === "tertiary" ? "auto" : "100%")};
  background-color: ${({ variant, disabled }) => {
    if (variant === "tertiary" || variant === "highlight") {
      return "transparent";
    }

    if (disabled) {
      return theme.colors.GRAY_100;
    }

    return theme.colors.WHITE;
  }};
  border-width: ${({ variant }) => {
    if (variant === "highlight") {
      return "2px";
    }

    if (variant === "secondary") {
      return "1.5px";
    }

    return "0px";
  }};
  border-color: ${({ variant, disabled }) => {
    if (disabled) {
      return theme.colors.GRAY_200;
    }

    if (variant === "highlight") {
      return theme.colors.WHITE;
    }

    return theme.colors.ORANGE_200;
  }};
`;

export const ButtonText = styled.Text<VariantProps>`
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m5};
  text-align: center;
  color: ${({ variant, disabled }) => {
    if (disabled) {
      return theme.colors.GRAY_300;
    }

    if (variant === "primary" || variant === "highlight") {
      return theme.colors.WHITE;
    }

    return theme.colors.ORANGE_200;
  }};
`;
