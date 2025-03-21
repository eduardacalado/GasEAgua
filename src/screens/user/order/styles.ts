import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollView = styled.ScrollView`
  background-color: transparent;
`;

export const AlterAddressButton = styled.TouchableOpacity`
  margin-top: ${theme.font.size.m7};
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

export const AlterLocationButtonText = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const Title = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.Text`
  /* flex: 1; */
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m5};
`;

export const AddItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.size.m3};
  width: 100%;
`;

export const AddItemNumber = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
`;

export const MinusPlusButton = styled.View`
  width: ${theme.size.m8};
  height: ${theme.size.m8};
  background-color: ${theme.colors.ORANGE_300};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
`;

export const TotalCash = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const TotalItems = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const ConfirmOrderButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const AddressContainer = styled.View`
  elevation: 5;
  margin-top: ${theme.size.m7};
  margin-bottom: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AddressSubContainer = styled.View`
  padding: ${theme.font.size.m6};
  padding-top: ${theme.font.size.m10};
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  gap: ${theme.size.base};
  width: 100%;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const OrderContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  elevation: 5;
  margin-top: ${theme.size.m11};
  margin-bottom: ${theme.size.m6};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;

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

export const OrderWaterTitleContainer = styled.View`
  padding-right: 12px;
`;

export const OrderTitle = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const CashContainer = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-right-radius: ${theme.size.m6};
  border-bottom-left-radius: ${theme.size.m6};
  align-items: center;
  width: 100%;
  padding: ${theme.font.size.m1};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
`;

export const AddItemRightContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${theme.size.m9};
`;

export const AddItemLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m2};
`;
