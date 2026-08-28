import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "src/styles/theme";
import * as S from "./styles";

type HelpHeaderButtonProps = {
  color?: string;
};

export function HelpHeaderButton({
  color = theme.colors.WHITE,
}: HelpHeaderButtonProps) {
  const navigation = useNavigation();

  const handlePressHelp = () => {
    navigation.navigate("helpCenter" as never);
  };

  return (
    <S.HelpButton
      onPress={handlePressHelp}
      activeOpacity={0.7}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Central de Ajuda"
    >
      <Feather name="help-circle" size={22} color={color} />
    </S.HelpButton>
  );
}
