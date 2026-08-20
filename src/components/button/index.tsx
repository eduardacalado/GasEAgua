import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import theme from "src/styles/theme";
import * as S from "./styles";
import { ButtonVariant } from "./types";

export type { ButtonVariant };

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
} & Omit<TouchableOpacityProps, "children">;

const PRIMARY_GRADIENT_COLORS = ["#DB1A00", "#ED4200", "#FF6A00"] as const;
const DISABLED_GRADIENT_COLORS = [
  theme.colors.GRAY_200,
  theme.colors.GRAY_200,
  theme.colors.GRAY_200,
] as const;

export const Button = ({
  title,
  variant = "primary",
  isLoading = false,
  disabled = false,
  onPress,
  style,
  ...props
}: ButtonProps) => {
  const isDisabled = isLoading || disabled;
  const isTertiary = variant === "tertiary";
  const isPrimary = variant === "primary";
  const isHighlight = variant === "highlight";

  let indicatorColor = theme.colors.ORANGE_200;
  if (isPrimary || isHighlight) {
    indicatorColor = theme.colors.WHITE;
  }

  const buttonLabel = (
    <S.ButtonText variant={variant} disabled={isDisabled}>
      {title}
    </S.ButtonText>
  );

  let buttonContent = buttonLabel;
  if (isLoading) {
    buttonContent = (
      <ActivityIndicator size="small" color={indicatorColor} />
    );
  }

  if (isPrimary) {
    const gradientColors = isDisabled
      ? DISABLED_GRADIENT_COLORS
      : PRIMARY_GRADIENT_COLORS;

    return (
      <S.TouchableArea
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={style}
        {...props}
      >
        <S.PrimaryBackground
          colors={[...gradientColors]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          {buttonContent}
        </S.PrimaryBackground>
      </S.TouchableArea>
    );
  }

  return (
    <S.TouchableArea
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      variant={variant}
      isTertiary={isTertiary}
      style={style}
      {...props}
    >
      <S.SurfaceBackground variant={variant} disabled={isDisabled}>
        {buttonContent}
      </S.SurfaceBackground>
    </S.TouchableArea>
  );
};
