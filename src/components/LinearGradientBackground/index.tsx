import { LinearGradientProps } from "expo-linear-gradient";
import * as S from "./styles";
import { LinearGradientBackgroundStyle } from "./styles";

type LinearGradientBackgroundVariant = "default" | "fullscreen";

type CustomLinearGradientProps = Omit<LinearGradientProps, "colors"> & {
  variant?: LinearGradientBackgroundVariant;
};

export const LinearGradientBackground = ({
  children,
  variant = "default",
}: CustomLinearGradientProps) => {
  const isFullscreen = variant === "fullscreen";

  return (
    <S.Container isFullscreen={isFullscreen}>
      <LinearGradientBackgroundStyle
        isFullscreen={isFullscreen}
        colors={["#DB1A00", "#ED4200", "#FF6A00"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
      {children}
    </S.Container>
  );
};
