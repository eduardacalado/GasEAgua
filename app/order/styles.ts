import styled from "styled-components/native";
import theme from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";

export const ScrollView = styled.ScrollView`
  background-color: transparent;
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background.white};
`;

export const OrderImage = styled.Image`
  width: ${theme.size.m15};
  height: ${theme.size.m15};
  border: 8px solid #e1e1e1;
  border-radius: ${theme.size.m14};
`;

export const FirstOrderContainer = styled.View`
  background-color: ${theme.colors.background.white};
  justify-content: center;
  align-items: center;
  gap: ${theme.size.m2};
  border-radius: ${theme.size.m6};
  elevation: 5;
  margin-top: 80px;
`;

export const AlterLocationButtonText = styled.Text`
  color: ${theme.colors.text.orange};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const Title = styled.Text`
  color: ${theme.colors.text.black};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.text.gray};
  font-size: ${theme.font.size.m5};
`;

export const AddItemContainer = styled.View`
  height: ${theme.size.m9};
  width: ${theme.size.m11};
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const AddItemNumber = styled.Text`
  color: ${theme.colors.text.black};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
`;

export const MinusPlusButton = styled.View`
  width: ${theme.size.m8};
  height: ${theme.size.m8};
  background-color: ${theme.colors.button.primary.background};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
`;

export const TotalCashContainer = styled(LinearGradient)`
  width: 325px;
  height: ${theme.size.m10};
  border-bottom-left-radius: ${theme.size.m6};
  border-bottom-right-radius: ${theme.size.m6};
  padding-right: ${theme.size.m2};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCash = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const TotalItems = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const ConfirmOrderButton = styled.View`
  width: 140px;
  height: ${theme.font.size.m9};
  align-items: center;
  justify-content: center;
  border-radius: ${theme.font.size.m4};
  background-color: ${theme.colors.button.primary.background};
`;

export const ConfirmOrderButtonText = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;

export const SecondOrderContainer = styled.View`
  background-color: ${theme.colors.background.white};
  width: 325px;
  border-radius: ${theme.size.m6};
  gap: ${theme.size.m2};
  elevation: 5;
  /* margin-top: ${theme.size.m6}; */
  /* margin-bottom: ${theme.size.m6}; */
`;

export const SecondOrderAddItemNumber = styled.Text`
  color: ${theme.colors.text.black};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
`;

export const SecondOrderMinusPlusButton = styled.View`
  width: ${theme.size.m8};
  height: ${theme.size.m8};
  background-color: ${theme.colors.button.secondary.background};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
`;

export const SecondOrderTitle = styled.Text`
  color: ${theme.colors.text.black};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const SecondTotalCashContainer = styled(LinearGradient)`
  width: 325px;
  height: ${theme.size.m10};
  border-bottom-left-radius: ${theme.size.m6};
  border-bottom-right-radius: ${theme.size.m6};
  padding-right: ${theme.size.m2};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
