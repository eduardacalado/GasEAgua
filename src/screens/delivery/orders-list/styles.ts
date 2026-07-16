import theme from "src/styles/theme";
import styled from "styled-components/native";

export const Divider = styled.View`
  height: 10px;
`;

export const Container = styled.View`
  padding-horizontal: ${theme.size.m3};
  flex: 1;
`;

export const FilterContainer = styled.View`
  width: 100%;
  height: 100px;
  padding-bottom: 50px;
  margin-top: ${theme.size.m11};
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export const FilterButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  padding: 0px 12px;
  border-radius: 10px;
  background-color: ${theme.colors.WHITE};
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 2px 2px;
`;

export const FilterControlShell = styled.View`
  flex: 1;
  height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.WHITE};
  padding-horizontal: 12px;
  justify-content: center;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 2px 2px;
`;

export const ClearFilterButton = styled.TouchableOpacity<{ color: string }>`
  width: 50px;
  height: 50px;
  background: ${({ color }) => color};
  border-radius: 14px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: 16px;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

export const StatusFilterOption = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  padding: ${theme.size.m3} ${theme.size.m4};
  min-height: 44px;
`;

export const StatusFilterDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

export const StatusFilterLabel = styled.Text<{ color: string }>`
  flex: 1;
  color: ${({ color }) => color};
  font-size: 15px;
  font-weight: bold;
`;
