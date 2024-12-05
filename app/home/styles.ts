import styled from "styled-components/native";
import theme from "../../styles/theme";
import { Image } from "expo-image";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  /* justify-content: center; */
`;

export const ButtonImage = styled(Image)`
  flex: 1;
  border: 8px solid #e1e1e1;
  border-radius: ${theme.size.m13};
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
  margin-top: 30px;
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.text.brand};
  text-align: center;
  font-size: ${theme.font.size.m7};
`;
