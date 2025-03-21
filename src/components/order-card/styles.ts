import { Swipeable } from "react-native-gesture-handler";
import theme from "src/styles/theme";
import styled from "styled-components/native";

export const SwipeableCard = styled(Swipeable)`
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const CardContainer = styled.View`
  width: 100%;
  padding: 18px;
  background: ${theme.colors.WHITE};
  border-radius: 18px;
  flex-direction: row;
  height: 110px;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const StatusSideContainer = styled.View`
  flex: 1;
  justify-content: center;
  gap: 10px;
`;

export const DateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

export const CardText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: 16px;
  font-weight: bold;
`;

export const LeftActionContainer = styled.View`
  height: 100%;
  border-radius: 10px;
  width: 80px;
  background-color: ${theme.colors.RED_100};
  justify-content: center;
  align-items: center;
`;

export const RightActionContainer = styled.View`
  height: 100%;
  border-radius: 10px;
  width: 80px;
  background-color: ${theme.colors.GREEN};
  justify-content: center;
  align-items: center;
`;
