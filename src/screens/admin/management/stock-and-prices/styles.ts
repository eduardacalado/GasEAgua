import styled from "styled-components/native";
import theme from "src/styles/theme";
import { StyleSheet } from "react-native";

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

export const SectionTitle = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.semibold};
  margin-bottom: ${theme.size.m3};
  margin-top: ${theme.size.m4};
`;

export const SectionTitleOnLightBackground = styled(SectionTitle)`
  color: ${theme.colors.GRAY_700};
`;

export const ProductCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5};
  margin-bottom: ${theme.size.m3};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const ProductHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.size.m2};
`;

export const ProductName = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
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

export const ProductInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.size.m1};
`;

export const ProductInfoLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
`;

export const ProductInfoValue = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m2};
  margin-top: ${theme.size.m3};
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.GRAY_100};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m2} ${theme.size.m3};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.size.m1};
`;

export const ActionButtonText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m2};
  font-weight: ${theme.font.weight.semibold};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${theme.colors.WHITE};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: ${theme.size.m7};
  padding-bottom: 40px;
`;

export const ModalTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
  margin-bottom: ${theme.size.m4};
`;

export const ModalSubtitle = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  margin-bottom: ${theme.size.m4};
`;

export const ModalInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  background-color: ${theme.colors.GRAY_100};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m3} ${theme.size.m4};
  font-size: ${theme.font.size.m4};
  color: ${theme.colors.GRAY_700};
  margin-bottom: ${theme.size.m4};
`;

export const ModalButtonsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const addonCard = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#121214",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});
