import { Picker } from "@react-native-picker/picker";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewBackground = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.WHITE};
`;

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const MapImage = styled(ImageBackground)`
  flex: 1;
  background-color: ${theme.colors.WHITE};
  width: 100%;
  height: 250px;
  padding: ${theme.size.m6};
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`;

export const Name = styled.Text`
  color: ${theme.colors.ORANGE_300};
  text-align: center;
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  padding-top: 10px;
`;

export const Email = styled.Text`
  color: ${theme.colors.ORANGE_100};
  text-align: center;
  font-size: ${theme.font.size.m6};
  padding-top: ${theme.size.m1};
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const TitleInfoContainer = styled.View`
  align-items: flex-start;
  gap: ${theme.size.base};
  flex: 1;
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.ORANGE_300};
  text-align: center;
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
  padding-top: ${theme.size.m7};
`;

export const StreetNumberInputContainer = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const InfoInputContainer = styled.View`
  border: 1px;
  border-radius: ${theme.size.m1};
  border-color: ${theme.colors.ORANGE_100};
  align-items: flex-start;
  width: 100%;
  padding-inline: ${theme.size.base};
`;

export const InfoInput = styled.TextInput`
  color: ${theme.colors.GRAY_500};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m6};
  border-radius: ${theme.size.m1};
  width: 100%;
`;

export const SelectInput = styled(Picker)`
  color: ${theme.colors.GRAY_500};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m6};
  border-radius: ${theme.size.m1};
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  gap: ${theme.size.m2};
  margin-top: ${theme.size.m7};
`;

export const AlterInfoButton = styled(LinearGradient)`
  padding: ${theme.size.m2};
  width: 100%;
  border-radius: ${theme.size.m7};
  align-items: center;
  cursor: pointer;
`;

export const LogoutButton = styled(LinearGradient)`
  padding: ${theme.size.m2};
  width: 100%;
  align-items: center;
  border-radius: ${theme.size.m7};
  cursor: pointer;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;
