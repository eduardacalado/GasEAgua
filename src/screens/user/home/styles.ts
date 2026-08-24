import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
    gap: 16,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const HeaderContent = styled.View`
  margin-top: ${theme.font.size.m8};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.m3};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.bold};
  flex: 1;
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.medium};
  margin-top: ${theme.size.m1};
  opacity: 0.95;
`;

export const OrderCardsContainer = styled.View`
  gap: ${theme.size.m4};
`;

export const OrderCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m4};
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m4};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const OrderCardImage = styled(Image)`
  width: ${theme.size.m11};
  height: ${theme.size.m11};
  border-radius: ${theme.size.m11};
`;

export const OrderCardTextGroup = styled.View`
  flex: 1;
`;

export const OrderCardTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const OrderCardDescription = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.regular};
  margin-top: ${theme.size.m1};
`;

export const SectionCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SectionTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
  margin-bottom: ${theme.size.m4};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const InfoTextGroup = styled.View`
  flex: 1;
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const InfoDescription = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.regular};
  margin-top: 2px;
`;

export const IconBadge = styled.View<{ backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.GRAY_100};
  margin: ${theme.size.m4} 0;
`;

export const OpenAccountsSummary = styled.View`
  margin-bottom: ${theme.size.m4};
`;

export const OpenAccountsCountText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const OpenAccountsBalance = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.extrabold};
  margin-top: ${theme.size.m1};
`;

export const OpenAccountsHint = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.regular};
  margin-top: ${theme.size.m1};
`;

export const OpenAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const OpenAccountTextGroup = styled.View`
  flex: 1;
`;

export const OpenAccountTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const OpenAccountMeta = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
  margin-top: 2px;
`;

export const OpenAccountTotal = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.bold};
`;

export const RemainingOpenAccountsText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.regular};
  margin-top: ${theme.size.m3};
`;

export const EmptyOpenAccountsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
`;

export const EmptyOpenAccountsText = styled.Text`
  flex: 1;
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.medium};
`;

export const OpenAccountsLoadingContainer = styled.View`
  padding: ${theme.size.m4} 0;
  align-items: center;
`;
