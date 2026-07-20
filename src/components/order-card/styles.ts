import theme from "src/styles/theme";
import styled from "styled-components/native";

export const ROW_ICON_BADGE_COLOR = theme.colors.GRAY_100;
export const ROW_ICON_COLOR = theme.colors.GRAY_300;

export const swipeableContainerStyle = {
  borderRadius: 16,
  overflow: "hidden" as const,
};

export const CardSurface = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5};
  width: 100%;
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const CardContent = styled.View`
  width: 100%;
  gap: ${theme.size.m4};
  position: relative;
`;

export const StatusHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
  align-self: flex-start;
`;

export const IconBadge = styled.View<{ backgroundColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: ${theme.size.m2};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const CardRowsContainer = styled.View`
  gap: ${theme.size.m3};
`;

export const CardRowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.m3};
`;

export const LabelGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
  flex-shrink: 1;
`;

export const ValueGroup = styled.View`
  align-items: flex-end;
  flex-shrink: 1;
  gap: 2px;
`;

export const CardLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.medium};
`;

export const CardValue = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
  text-align: right;
`;

export const ExpirationCardValue = styled(CardValue)<{ isExpired: boolean }>`
  color: ${({ isExpired }) =>
    isExpired ? theme.colors.RED_100 : theme.colors.GRAY_700};
`;

export const CardText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: 16px;
  font-weight: bold;
`;

export const RightActionTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  align-self: stretch;
`;

export const LeftActionContainer = styled.View`
  flex: 1;
  border-radius: ${theme.size.m5};
  width: 80px;
  background-color: ${theme.colors.RED_100};
  justify-content: center;
  align-items: center;
`;

export const RightActionContainer = styled.View`
  flex: 1;
  border-radius: ${theme.size.m5};
  width: 80px;
  background-color: ${theme.colors.GREEN};
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.View`
  position: absolute;
  top: -7;
  right: -5;
  background-color: ${theme.colors.RED_100};
  padding: 4px;
  border-radius: ${theme.size.m2};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.GRAY_100};
  width: 100%;
`;
