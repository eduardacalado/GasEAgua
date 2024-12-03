import styled from "styled-components/native";
import theme from "../../styles/theme";
import { LinearGradient} from 'expo-linear-gradient';

export const SafeAreaViewContainer = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${theme.colors.background.white};
`;

export const OrderImage = styled.Image`
  width: ${theme.size.m15};
  height: ${theme.size.m15};
  position: absolute;
  top: ${theme.size.m12};
  left: ${theme.size.m11};
  border: 8px solid #e1e1e1;
  border-radius: ${theme.size.m14};
`;

export const Container = styled.View`
    background-color: ${theme.colors.background.white};
    position: absolute;
    bottom: 220px;
    width: 325px;
    height: 350px;
    border-radius: ${theme.size.m6};
    align-items: left;
    gap: ${theme.size.m2};
    elevation: 5;
    padding-top: ${theme.size.m12};
`;

export const AlterLocationButtonText = styled.Text`
  color: ${theme.colors.text.orange};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
  left: ${theme.size.m11};
`;

export const Title = styled.Text`
  color: ${theme.colors.text.black};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
  left: ${theme.size.m5};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.text.gray};
  top: -10px;
  left: ${theme.size.m5};
  font-size: ${theme.font.size.m5};
`;

export const AddItemContainer = styled.View`
  height: ${theme.size.m9};
  width: ${theme.size.m11};
  flex-direction: row;
  gap: ${theme.size.m3};
  padding-left: ${theme.size.m3};
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
  padding-left: ${theme.size.m2};
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
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${theme.colors.button.primary.background};
`;

export const ConfirmOrderButtonText = styled.Text`
  color: ${theme.colors.text.white};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.bold};
`;