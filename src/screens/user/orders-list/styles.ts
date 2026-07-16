import theme from "src/styles/theme";
import styled from "styled-components/native";

export const Divider = styled.View`
  height: 12px;
`;

export const Container = styled.View`
  padding-horizontal: ${theme.size.m4};
  flex: 1;
`;

export const HeaderSpacing = styled.View`
  height: ${theme.size.m12};
`;

export const UserContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 80px;
  margin-bottom: 50px;
`;

export const UserNameContainer = styled.View`
  justify-content: space-between;
  padding: 2px;
  height: 100%;
`;

export const UserName = styled.Text`
  font-size: 18px;
  color: ${theme.colors.GRAY_700};
  width: 100%;
`;

export const WelcomeText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.WHITE};
`;

export const UserAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
`;

export const Content = styled.View`
  background-color: ${theme.colors.GRAY_500};
  flex: 1;
  border-radius: 30px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 25px 10px 0px;
`;

export const InfoCard = styled.View`
  width: 100%;
  padding: 10px;
  border: 2px solid ${theme.colors.GRAY_200};
  border-radius: 10px;
  min-height: 100px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  color: ${theme.colors.GRAY_100};
  font-size: 22px;
  font-weight: bold;
`;

export const SaleInfo = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${theme.colors.ORANGE_100};
`;

export const CardSideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FilterContainer = styled.View`
  width: 100%;
  height: 100px;
  padding-bottom: 50px;
  margin-top: ${theme.size.m11};
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const FilterControlShell = styled.View<{
  backgroundColor?: string;
  isActive?: boolean;
}>`
  flex: 1;
  height: 50px;
  border-radius: ${theme.size.m4};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? theme.colors.WHITE};
  padding-horizontal: ${theme.size.m3};
  justify-content: center;
  elevation: 3;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  border-width: ${({ isActive }) => (isActive ? "1.5px" : "0px")};
  border-color: ${({ isActive }) =>
    isActive ? theme.colors.ORANGE_200 : "transparent"};
`;

export const FilterButton = styled.TouchableOpacity<{
  backgroundColor?: string;
  isActive?: boolean;
}>`
  flex: 1;
  height: 50px;
  padding: 0 ${theme.size.m3};
  border-radius: ${theme.size.m4};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? theme.colors.WHITE};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.size.m2};
  elevation: 3;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  border-width: ${({ isActive }) => (isActive ? "1.5px" : "0px")};
  border-color: ${({ isActive }) =>
    isActive ? theme.colors.ORANGE_200 : "transparent"};
`;

export const FilterIconBadge = styled.View<{ backgroundColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: ${theme.size.m2};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const ClearFilterButton = styled.TouchableOpacity<{
  backgroundColor: string;
  isEnabled: boolean;
}>`
  width: 50px;
  height: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${theme.size.m4};
  justify-content: center;
  align-items: center;
  elevation: ${({ isEnabled }) => (isEnabled ? 3 : 0)};
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: ${({ isEnabled }) => (isEnabled ? 0.08 : 0)};
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const ButtonText = styled.Text<{ color?: string }>`
  color: ${({ color }) => color ?? theme.colors.GRAY_600};
  font-size: ${theme.font.size.m3};
  flex-shrink: 1;
  text-align: center;
  font-weight: ${theme.font.weight.bold};
`;

export const StatusFilterOption = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  padding: ${theme.size.m3} ${theme.size.m4};
  min-height: 44px;
`;

export const StatusFilterIconBadge = styled.View<{ backgroundColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: ${theme.size.m2};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const StatusFilterLabel = styled.Text<{ color: string }>`
  flex: 1;
  color: ${({ color }) => color};
  font-size: 15px;
  font-weight: bold;
`;
