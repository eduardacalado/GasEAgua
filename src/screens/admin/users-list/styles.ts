import theme from "src/styles/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  padding-horizontal: ${theme.size.m3};
  flex: 1;
`;

export const Divider = styled.View`
  height: 10px;
`;

export const SearchContainer = styled.View`
  width: 100%;
  margin-top: ${theme.size.m2};
  margin-bottom: ${theme.size.m4};
`;

export const SearchInputShell = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-radius: 12px;
  background-color: ${theme.colors.WHITE};
  padding-horizontal: ${theme.size.m4};
  gap: ${theme.size.m3};
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 2px 2px;
`;

export const SearchInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  flex: 1;
  height: 50px;
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  color: ${theme.colors.GRAY_600};
`;

export const ClearSearchButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${theme.colors.GRAY_100};
  align-items: center;
  justify-content: center;
`;
