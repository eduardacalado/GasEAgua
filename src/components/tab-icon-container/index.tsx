import theme from "src/styles/theme";
import * as S from "./styles";

type TabIconContainerProps = {
  focused: boolean;
  children: React.ReactNode;
};

export const TabIconContainer = ({
  children,
  focused,
}: TabIconContainerProps) => {
  const getColor = (focused: boolean) => {
    return focused ? theme.colors.ORANGE_200 : theme.colors.GRAY_100;
  };
  return <S.Container color={getColor(focused)}>{children}</S.Container>;
};
