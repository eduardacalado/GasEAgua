import { LinearGradientProps } from "expo-linear-gradient";
import * as S from "./styles";
import { LinearGradientBackgroundStyle } from "./styles";

type CustomLinearGradientProps = Omit<LinearGradientProps, "colors">;

export const LinearGradientBackground = ({
  children,
}: CustomLinearGradientProps) => {
  return (
    <S.Container>
      <LinearGradientBackgroundStyle
        colors={["#DB1A00", "#ED4200", "#FF6A00"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      />
      {children}
    </S.Container>
  );
};
