import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../styles/theme";

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: flex-start;
`;

export const Container = styled.View`
  padding: ${theme.size.m7};
  background-color: ${theme.colors.background.white};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
  margin-top: 250px;
  elevation: 5;
`;

export const InputArea = styled.View`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  border-radius: ${theme.size.m7};
  background-color: ${theme.colors.input.background};
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.size.m4};
  margin-left: ${theme.size.m2};
`;

export const LoginButton = styled(LinearGradient)`
  padding: ${theme.size.m2};
  width: 200px;
  margin-top: ${theme.size.m9};
  align-items: center;
  border-radius: ${theme.size.m7};
`;

export const LoginButtonText = styled.Text`
  color: ${theme.colors.button.primary.text};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m4};
`;
