import styled from "styled-components/native";
import theme from "src/styles/theme";

export const SafeAreaContainer = styled.View`
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

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.m3};
  margin-top: ${theme.font.size.m8};
  margin-bottom: ${theme.size.m6};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
`;

export const LowStockBanner = styled.View`
  background-color: ${theme.colors.RED_100};
  border-radius: ${theme.size.m3};
  padding: ${theme.size.m4};
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
  margin-bottom: ${theme.size.m6};
`;

export const LowStockBannerText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
  flex: 1;
`;

export const CardsContainer = styled.View`
  gap: ${theme.size.m4};
`;

export const MenuCard = styled.TouchableOpacity`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const MenuCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  margin-bottom: ${theme.size.m2};
`;

export const MenuCardIconBadge = styled.View<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const MenuCardTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
`;

export const MenuCardDescription = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.regular};
  margin-left: 52px;
`;

export const LowStockBadge = styled.View`
  background-color: ${theme.colors.RED_100};
  border-radius: 12px;
  padding: 2px 8px;
`;

export const LowStockBadgeText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m1};
  font-weight: ${theme.font.weight.bold};
`;
