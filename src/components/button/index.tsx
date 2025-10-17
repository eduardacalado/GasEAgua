import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import theme from "src/styles/theme";
import * as S from "./styles";

type ButtonProps = {
  isLoading?: boolean;
  color: string;
} & TouchableOpacityProps;

export const Button = ({
  onPress,
  isLoading = false,
  children,
  color = theme.colors.ORANGE_200,
  ...props
}: ButtonProps) => {
  return (
    <S.ButtonContainer
      onPress={onPress}
      disabled={isLoading}
      color={color}
      {...props}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </S.ButtonContainer>
  );
};
