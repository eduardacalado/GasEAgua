import theme from "src/styles/theme";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  width: 100%;
`;

export const ContentContainer = styled.View`
  gap: ${theme.size.m5};
  width: 100%;
  padding-top: ${theme.size.m4};
`;

export const SectionCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: 12px;
  padding: ${theme.size.m5};
  gap: ${theme.size.m3};
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

export const SummaryCard = styled(SectionCard)`
  border-top-width: 4px;
  border-top-color: ${theme.colors.ORANGE_300};
`;

export const SectionTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
`;

export const SectionAccent = styled.View`
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background-color: ${theme.colors.ORANGE_300};
`;

export const SectionTitle = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const RowLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  flex: 1;
`;

export const RowValue = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
  text-align: right;
`;

export const SummaryTitle = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.extrabold};
`;

export const OpenBalanceValue = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.extrabold};
`;

export const AccountsList = styled.View`
  gap: ${theme.size.m3};
`;

export const SortControlShell = styled.View`
  min-height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.GRAY_100};
  padding-horizontal: 12px;
  justify-content: center;
`;

export const LoadMoreButton = styled.TouchableOpacity`
  align-self: center;
  padding: ${theme.size.m3} ${theme.size.m5};
`;

export const LoadMoreButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const dropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
  },
  placeholder: {
    fontSize: 16,
    color: theme.colors.GRAY_300,
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.GRAY_600,
  },
  icon: {
    width: 20,
    height: 20,
  },
  menuContainer: {
    borderRadius: 12,
    backgroundColor: theme.colors.WHITE,
    marginTop: 6,
    paddingVertical: 4,
    elevation: 8,
  },
});
