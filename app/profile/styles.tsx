import styled from "styled-components/native";
import theme from "../../styles/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export const LinearGradientBackground = styled(LinearGradient)`
  flex: 1;
`;

export const MapImage = styled(Image)`
  flex: 1;
  background-color: white;
`

export const SafeAreaViewContainer = styled.View`
  flex: 1;
`;

export const ProfileImageContainer = styled.View`
  position: absolute;
  width: 200px;
  height: 200px;
  gap: ${theme.size.m1};
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 200px;
`;

export const ProfileImageButton = styled.TouchableOpacity`
  flex: 1;
`;

export const ProfileImage = styled(Image)`
  flex: 1;
  background-color: #e1e1e1;
  border-radius: 999px;
  aspect-ratio: 1;
  border: 15px solid #ED4200;
`;

export const Name = styled.Text`
  color: ${theme.colors.text.white};
  text-align: center;
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  padding-top: 100px;
`;

export const Email = styled.Text`
  color: ${theme.colors.text.white};
  text-align: center;
  font-size: ${theme.font.size.m6};
  padding-top: ${theme.size.m1};
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding-left: ${theme.size.m7};
`;

export const TitleSubtitleContainer = styled.View`
  align-items: flex-start;
  gap: ${theme.size.base};
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.text.white};
  text-align: center;
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.bold};
  padding-top: ${theme.size.m7};
`;

export const InfoSubitle = styled.Text`
  color: ${theme.colors.text.white};
  justify-content: center;
  text-align: center;
  font-size: ${theme.font.size.m6};
  padding: ${theme.size.m2};
  background-color: #FF6A00;
  border-radius: ${theme.size.m1};
`;

export const AlterInfoButtonContainer = styled.View`
  padding: ${theme.size.m7}
`;

export const AlterInfoButton = styled.TouchableOpacity`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.size.m4};
  background-color: ${theme.colors.button.secondary.background};
  flex-direction: row;
`;

export const AlterInfoButtonText = styled.Text`
  color: ${theme.colors.button.secondary.text};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;