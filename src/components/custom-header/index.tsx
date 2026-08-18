import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "src/styles/theme";
import * as S from "./styles";

type CustomHeaderProps = {
  handleBack?: () => void;
  color?: string;
};

export const CustomHeader = ({ handleBack, color }: CustomHeaderProps) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    if (handleBack) {
      handleBack();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <S.Container>
      <S.BackButton onPress={handlePressBack} hitSlop={16}>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={color ?? theme.colors.WHITE}
        />
      </S.BackButton>
    </S.Container>
  );
};
