import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const HeaderContent = styled.View`
  margin-top: ${theme.font.size.m8};
  margin-bottom: ${theme.size.m8};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.medium};
  margin-top: ${theme.size.m1};
  opacity: 0.95;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${theme.size.m4};
  margin-top: ${theme.size.m8};
`;

export const OrderCard = styled.TouchableOpacity`
  flex: 1;
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5} ${theme.size.m4} ${theme.size.m4};
  align-items: center;
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const ButtonImage = styled(Image)`
  width: 100%;
  border-radius: 999px;
  aspect-ratio: 1;
  margin-bottom: ${theme.size.m4};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  background-color: ${theme.colors.ORANGE_200};
  font-weight: ${theme.font.weight.bold};
  padding: ${theme.size.m2} ${theme.size.m3};
  border-radius: ${theme.size.m3};
  font-size: ${theme.font.size.m4};
  text-align: center;
  overflow: hidden;
  width: 100%;
`;
