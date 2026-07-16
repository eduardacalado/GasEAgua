import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: center;
`;

export const Container = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  padding-horizontal: ${theme.size.m6};
  padding-vertical: ${theme.size.m8};
`;

export const BrandBadge = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: ${theme.colors.ORANGE_50};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.size.m2};
`;

export const BrandImage = styled(Image)`
  width: 48px;
  height: 48px;
`;

export const SignupButton = styled.TouchableOpacity`
  min-height: 52px;
  padding: ${theme.size.m4};
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.size.m4};
  background-color: ${theme.colors.ORANGE_50};
  border-width: 1.5px;
  border-color: ${theme.colors.ORANGE_100};
`;

export const SignupButtonText = styled.Text`
  color: ${theme.colors.ORANGE_200};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m5};
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
`;

export const LoginButtonGradient = styled(LinearGradient)`
  min-height: 52px;
  padding: ${theme.size.m4};
  border-radius: ${theme.size.m4};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LoginButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.m5};
`;
