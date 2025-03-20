import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m8};
  justify-content: flex-start;
`;

export const Container = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
  elevation: 5;
  padding-horizontal: ${theme.size.m6};
  padding-vertical: ${theme.size.m9};
  margin-top: 290px;
`;

export const SignupButton = styled.TouchableOpacity`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  border-radius: ${theme.size.m7};
  background-color: ${theme.colors.GRAY_200};
`;

export const SignupButtonText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m4};
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
`;

export const LoginButtonGradient = styled(LinearGradient)`
  padding: ${theme.size.m2};
  border-radius: ${theme.size.m7};
  align-items: center;
  width: 100%;
`;

export const LoginButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m4};
`;
