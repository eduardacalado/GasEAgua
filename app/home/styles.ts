import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ProfileButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ProfileButton = styled.TouchableOpacity`
  justify-content: flex-end;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  margin-top: 250px;
`;

export const ButtonImage = styled(Image)`
  width: 100%;
  border: 8px solid #e1e1e1;
  border-radius: 999px;
  aspect-ratio: 1;
  margin-bottom: -40px;
`;

export const OrderButton = styled.TouchableOpacity`
  flex: 1;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.button.primary.background};
  font-weight: ${theme.font.weight.bold};
  padding: ${theme.size.m1};
  border-radius: ${theme.size.m2};
  font-size: ${theme.font.size.m6};
  text-align: center;
`;

export const Title = styled.Text`
  color: ${theme.colors.text.brand};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.font.size.m8};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.text.brand};
  text-align: center;
  font-size: ${theme.font.size.m7};
`;
