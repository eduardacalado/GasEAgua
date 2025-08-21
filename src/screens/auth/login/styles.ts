import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const Container = styled.View`
  padding: ${theme.size.m2};
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
  margin-top: 250px;
  elevation: 5;
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
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.size.m4};
  margin-left: ${theme.size.base};
`;

export const LoginButton = styled(LinearGradient)`
  padding: ${theme.size.m2};
  width: 200px;
  margin-top: ${theme.size.m5};
  align-items: center;
  border-radius: ${theme.size.m7};
`;

export const LoginButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m4};
`;

export const LabelError = styled.Text`
  align-self: flex-start;
  color: #ff375b;
`;
