import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollView = styled.ScrollView`
  background-color: transparent;
`;

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: flex-start;
`;

export const OrderImage = styled.Image`
  width: ${theme.size.m13};
  height: ${theme.size.m13};
  border: 8px solid #e1e1e1;
  border-radius: ${theme.size.m14};
`;

export const ImageContainer = styled.View`
  margin-bottom: -50px;
  z-index: ${theme.font.size.m1};

  width: ${theme.size.m13};
  height: ${theme.size.m13};
`;

export const DualOrderImagesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: -40px;
  z-index: ${theme.font.size.m1};
  gap: ${theme.size.m2};
`;

export const DualOrderImage = styled(OrderImage)`
  width: ${theme.size.m12};
  height: ${theme.size.m12};
`;

export const AddItemContainer = styled.View`
  width: 100%;
  padding: ${theme.size.m3} 0;
  gap: ${theme.size.m2};
`;

export const MinusPlusButton = styled.View`
  width: ${theme.size.m8};
  height: ${theme.size.m8};
  background-color: ${theme.colors.ORANGE_300};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
`;

export const ConfirmOrderButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const AddressContainer = styled.View`
  margin-top: ${theme.size.m7};
  margin-bottom: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const OrderContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  padding: ${theme.font.size.m7};
  padding-top: ${theme.font.size.m10};
  margin-bottom: ${theme.size.m6};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const SecondOrderAddItemNumber = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const OrderMinusPlusButton = styled.View`
  width: ${theme.size.m8};
  height: ${theme.size.m8};
  background-color: ${theme.colors.GRAY_200};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
`;

export const OrderWaterTitleContainer = styled.View``;

export const OrderTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const OrderSectionTitle = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
  align-self: flex-start;
  margin-bottom: ${theme.size.m2};
`;

export const OrderItemSubtitle = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.medium};
  margin-top: ${theme.size.m1};
  line-height: 20px;
`;

export const ProductInfoContainer = styled.View`
  width: 100%;
`;

export const OrderPrice = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const UnavailableStockMessage = styled(OrderTitle)`
  text-align: center;
  padding: ${theme.size.m8} ${theme.size.m4};
`;

export const ValueText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const AddItemControlsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AddItemLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m2};
`;

export const AddonItemBottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AddonQuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m2};
  flex: 1;
`;

export const AddonItemTopContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: ${theme.size.m1};
`;

export const AddonItemContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${theme.size.m3} 0;
  width: 100%;
  gap: ${theme.size.m3};
`;

export const AddonSectionContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  padding: ${theme.font.size.m7};
  border-radius: ${theme.size.m6};
  align-items: flex-start;
  width: 100%;
  gap: ${theme.size.m2};

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const AddonSectionHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${theme.size.m2};
`;

export const AddonSectionHeaderTextContainer = styled.View`
  flex: 1;
`;

export const AddonSectionHeaderTitle = styled(OrderSectionTitle)`
  margin-bottom: 0;
  align-self: auto;
`;

export const OrderTotalContainer = styled.View`
  margin-top: ${theme.size.m5};
  margin-bottom: ${theme.size.m10};
`;

export const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${theme.size.m6};
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
