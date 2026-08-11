import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const Container = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  align-items: stretch;
  justify-content: center;
  gap: ${theme.size.m4};
  margin-top: auto;
  margin-bottom: auto;
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  padding: ${theme.size.m6};
`;

export const Title = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m6};
  text-align: center;
  margin-bottom: ${theme.size.m2};
`;

export const InputArea = styled.View`
  padding-horizontal: ${theme.size.m3};
  width: 100%;
  min-height: 52px;
  align-items: center;
  border-radius: ${theme.size.m3};
  border-width: 1.5px;
  border-color: ${theme.colors.GRAY_200};
  background-color: ${theme.colors.GRAY_100};
  flex-direction: row;
  gap: ${theme.size.m2};
`;

export const InputIconBadge = styled.View`
  width: 28px;
  height: 28px;
  border-radius: ${theme.size.m2};
  background-color: ${theme.colors.ORANGE_50};
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.font.size.m4};
  color: ${theme.colors.GRAY_700};
  font-weight: ${theme.font.weight.medium};
`;

export const LoginButton = styled(LinearGradient)`
  min-height: 52px;
  padding: ${theme.size.m4};
  width: 100%;
  margin-top: ${theme.size.m3};
  align-items: center;
  justify-content: center;
  border-radius: ${theme.size.m4};
`;

export const LoginButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m5};
`;

export const LabelError = styled.Text`
  align-self: flex-start;
  color: ${theme.colors.RED_100};
  font-size: ${theme.font.size.m3};
  margin-top: -${theme.size.m2};
`;
