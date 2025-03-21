import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "src/styles/theme";
import * as S from "./styles";

type CustomHeaderProps = {
  handleBack?: () => void;
  color?: string;
};

export const CustomHeader = ({ handleBack, color }: CustomHeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <S.Container>
      <MaterialIcons
        name="arrow-back-ios"
        size={24}
        color={color ?? theme.colors.WHITE}
        onPress={handleBack ?? goBack}
      />
    </S.Container>
  );
};
