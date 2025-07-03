import { Image, ImageBackground } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewBackground = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.ORANGE_300};
`;

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const MapImage = styled(ImageBackground)`
  flex: 1;
  background-color: white;
  width: 100%;
  height: 250px;
  padding: ${theme.size.m6};
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`;

export const ProfileImageContainer = styled.View`
  align-items: center;
  width: 100%;
  height: 200px;
  gap: ${theme.size.m1};
  margin-top: -90px;
`;

export const ProfileImageButton = styled.TouchableOpacity`
  flex: 1;
`;

export const ProfileImage = styled(Image)`
  flex: 1;
  background-color: #e1e1e1;
  border-radius: 999px;
  aspect-ratio: 1;
  border: 15px solid #ed4200;
`;

export const Name = styled.Text`
  color: ${theme.colors.WHITE};
  text-align: center;
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  padding-top: 10px;
`;

export const Email = styled.Text`
  color: ${theme.colors.WHITE};
  text-align: center;
  font-size: ${theme.font.size.m6};
  padding-top: ${theme.size.m1};
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const TitleSubtitleContainer = styled.View`
  align-items: flex-start;
  gap: ${theme.size.base};
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.WHITE};
  text-align: center;
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.bold};
  padding-top: ${theme.size.m7};
`;

export const InfoInput = styled.TextInput`
  color: ${theme.colors.WHITE};
  justify-content: center;
  text-align: center;
  font-size: ${theme.font.size.m6};
  padding: ${theme.size.m2};
  background-color: #ff6a00;
  border-radius: ${theme.size.m1};
`;

export const AlterInfoButtonContainer = styled.View`
  gap: ${theme.size.m1};
  margin-top: ${theme.size.m7};
`;

export const AlterInfoButton = styled.TouchableOpacity`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.size.m4};
  background-color: ${theme.colors.GREEN};
  flex-direction: row;
  cursor: pointer;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.size.m4};
  background-color: ${theme.colors.RED_200};
  flex-direction: row;
`;

export const AlterInfoButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;
