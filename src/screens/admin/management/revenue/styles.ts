import styled from "styled-components/native";
import theme from "src/styles/theme";

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.size.m6};
  margin-bottom: ${theme.size.m6};
`;

export const ChipsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m2};
  margin-bottom: ${theme.size.m6};
`;

export const Chip = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: ${theme.size.m8};
  padding: ${theme.size.m1} ${theme.size.m4};
  border-width: ${({ active }) => (active ? "1px" : "0px")};
  border-color: ${theme.colors.WHITE};
`;

export const ChipText = styled.Text<{ active: boolean }>`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${({ active }) =>
    active ? theme.font.weight.bold : theme.font.weight.medium};
`;

export const DateRangeRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
  margin-bottom: ${theme.size.m6};
`;

export const DateButton = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m2} ${theme.size.m3};
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m1};
`;

export const DateButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.medium};
`;

export const CardsContainer = styled.View`
  gap: ${theme.size.m4};
`;

export const HighlightCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  border-left-width: 4px;
  border-left-color: ${theme.colors.GREEN};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const DataCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SideBySideRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m4};
`;

export const SideBySideCard = styled.View`
  flex: 1;
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
  margin-bottom: ${theme.size.m3};
`;

export const IconBadge = styled.View<{ backgroundColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const CardLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m2};
  font-weight: ${theme.font.weight.medium};
  flex: 1;
`;

export const CardValue = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.extrabold};
`;

export const CardValueSmall = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.extrabold};
`;

export const CardUnit = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.medium};
  margin-top: 4px;
`;
