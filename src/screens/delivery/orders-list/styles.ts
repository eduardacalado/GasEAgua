import theme from "src/styles/theme";
import styled from "styled-components/native";

export const Divider = styled.View`
  height: 12px;
`;

export const Container = styled.View`
  padding-horizontal: ${theme.size.m4};
  flex: 1;
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

export const dropdownStyle = {
  height: 50,
  paddingLeft: 4,
};

export const dropdownPlaceholderStyle = {
  fontSize: 13,
  color: theme.colors.GRAY_300,
  fontWeight: "700" as const,
};

export const dropdownSelectedTextStyle = {
  fontSize: 13,
  fontWeight: "700" as const,
};

export const dropdownIconStyle = {
  width: 18,
  height: 18,
};

export const dropdownMenuContainerStyle = {
  borderRadius: 12,
  backgroundColor: theme.colors.WHITE,
  marginTop: 6,
  paddingVertical: 4,
  minWidth: 200,
  elevation: 8,
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
};

export const dropdownMenuItemContainerStyle = {
  paddingHorizontal: 0,
};
