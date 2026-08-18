import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: flex-start;
`;

export const Container = styled.View`
  padding: ${theme.size.m2};
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
  margin-top: ${theme.size.m4};
  elevation: 5;
`;

export const SelectInput = styled(Picker)`
  color: ${theme.colors.GRAY_500};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m6};
  border-radius: ${theme.size.m1};
  width: 100%;
`;

export const StreetNumberInputContainer = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const Title = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m7};
  text-align: center;
`;

export const InputArea = styled.View`
  padding: ${theme.size.base};
  width: 100%;
  align-items: center;
  border-radius: ${theme.size.m4};
  border: ${theme.colors.GRAY_200};
  background-color: ${theme.colors.GRAY_100};
  flex-direction: row;
  flex: 1;
  max-height: 55px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.size.m4};
  margin-left: ${theme.size.m2};
`;

export const SignUpButton = styled(LinearGradient)`
  padding: ${theme.size.m2};
  width: 200px;
  margin-top: ${theme.size.m5};
  align-items: center;
  border-radius: ${theme.size.m7};
`;

export const SignUpButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m4};
`;

export const LabelError = styled.Text`
  align-self: flex-start;
  color: #ff375b;
`;
