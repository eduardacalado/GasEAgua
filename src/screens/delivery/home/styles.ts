import styled from "styled-components/native";
import theme from "src/styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.m3};
  margin-top: ${theme.font.size.m8};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.medium};
  margin-top: ${theme.size.m1};
  margin-bottom: ${theme.size.m4};
  opacity: 0.95;
`;

export const DateChip = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m1};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.size.m8};
  padding: ${theme.size.m1} ${theme.size.m4};
  margin-bottom: ${theme.size.m6};
`;

export const DateChipText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.medium};
`;

export const CardsContainer = styled.View`
  flex-direction: column;
  align-items: stretch;
  gap: ${theme.size.m4};
  width: 100%;
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

export const HighlightCard = styled(DataCard)`
  border-left-width: 4px;
  border-left-color: ${theme.colors.ORANGE_200};
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
  border-radius: ${theme.size.m2};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const DataLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
  flex-shrink: 1;
`;

export const DataValue = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m10};
  font-weight: ${theme.font.weight.bold};
  line-height: ${theme.font.size.m10};
`;

export const DataValueDescription = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.regular};
  margin-bottom: ${theme.size.m1};
  flex-shrink: 2;
`;

export const DataValueRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: ${theme.size.m2};
`;

export const SideBySideContainer = styled.View`
  flex-direction: row;
  align-items: stretch;
  gap: ${theme.size.m3};
  width: 100%;
`;

export const SideBySideCard = styled(DataCard)`
  flex: 1;
  padding: ${theme.size.m5};
`;
