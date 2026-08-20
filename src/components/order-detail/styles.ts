import theme from "src/styles/theme";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: flex-start;
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
  padding-top: ${theme.size.m6};
  gap: ${theme.size.m4};
`;

export const SummaryHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OrderIdentifier = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const TotalBlock = styled.View`
  align-items: flex-end;
  gap: 2px;
`;

export const TotalLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const TotalValue = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.extrabold};
`;

export const MetaGroup = styled.View`
  gap: ${theme.size.m2};
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
  flex: 1;
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

export const ListGroup = styled.View`
  gap: ${theme.size.m1};
`;

export const ListRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.size.m1};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.GRAY_200};
  width: 100%;
`;

export const AddressBox = styled.View`
  background-color: ${theme.colors.GRAY_100};
  border-radius: 10px;
  padding: ${theme.size.m4};
`;

export const AddressText = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  line-height: 22px;
`;

export const PixCopyButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m2};
  background-color: ${theme.colors.ORANGE_200};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m3};
  margin-top: ${theme.size.m2};
`;

export const PixCopyButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.bold};
`;

export const StatusActionCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: 12px;
  padding: ${theme.size.m5};
  gap: ${theme.size.m3};
  width: 100%;
  margin-top: ${theme.size.m4};
  margin-bottom: ${theme.size.m3};
  elevation: 6;
  z-index: 20;
`;

export const StatusActionLabel = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const StatusDropdown = styled.View<{
  borderColor: string;
  backgroundColor: string;
}>`
  width: 100%;
  min-height: 52px;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${({ borderColor }) => borderColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding-horizontal: 10px;
  z-index: 30;
`;

export const StatusOptionRow = styled.View<{ backgroundColor: string }>`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  padding: ${theme.size.m3} ${theme.size.m4};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
`;

export const StatusColorDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

export const StatusLeftIconSlot = styled.View`
  margin-right: ${theme.size.m2};
`;

export const StatusOptionLabel = styled.Text<{ color: string }>`
  flex: 1;
  color: ${({ color }) => color};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const StatusSelectedMark = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const statusDropdownStyles = StyleSheet.create({
  dropdown: {
    height: 52,
    borderWidth: 0,
    paddingHorizontal: 4,
  },
  placeholder: {
    fontSize: 18,
    color: theme.colors.GRAY_300,
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 22,
    height: 22,
  },
  menuContainer: {
    borderWidth: 2,
    borderRadius: 14,
    borderColor: theme.colors.GRAY_200,
    backgroundColor: theme.colors.WHITE,
    marginTop: 6,
    paddingVertical: 4,
    elevation: 8,
    zIndex: 1000,
  },
});
