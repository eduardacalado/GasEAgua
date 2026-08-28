import { HelpHeaderButton } from "@components/help-header-button";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "src/styles/theme";
import * as S from "./styles";

type CustomHeaderProps = {
  handleBack?: () => void;
  color?: string;
  showHelpButton?: boolean;
  showBackButton?: boolean;
};

export const CustomHeader = ({
  handleBack,
  color,
  showHelpButton = true,
  showBackButton = true,
}: CustomHeaderProps) => {
  const navigation = useNavigation();
  const iconColor = color ?? theme.colors.WHITE;
  let headerRowJustifyContent = "space-between";

  if (!showBackButton) {
    headerRowJustifyContent = "flex-end";
  }

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
      <S.HeaderRow justifyContent={headerRowJustifyContent}>
        {showBackButton && (
          <S.BackButton
            onPress={handlePressBack}
            activeOpacity={0.7}
            hitSlop={8}
          >
            <MaterialIcons name="arrow-back-ios" size={22} color={iconColor} />
          </S.BackButton>
        )}
        {showHelpButton && <HelpHeaderButton color={iconColor} />}
      </S.HeaderRow>
    </S.Container>
  );
};
