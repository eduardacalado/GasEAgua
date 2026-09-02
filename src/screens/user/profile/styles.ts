import { Picker } from "@react-native-picker/picker";
import { ImageBackground } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewBackground = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${theme.colors.GRAY_100};
`;

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m5} ${theme.size.m5} ${theme.size.m7};
  margin-top: -${theme.size.m6};
`;

export const MapBanner = styled.View`
  width: 100%;
  height: 220px;
`;

export const MapImage = styled(ImageBackground)`
  width: 100%;
  height: 220px;
  background-color: ${theme.colors.GRAY_200};
`;

export const MapHeaderOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding-horizontal: ${theme.size.m5};
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.GRAY_100};
`;

export const ProfileHeader = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5};
  align-items: center;
  margin-bottom: ${theme.size.m4};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const AvatarBadge = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${theme.colors.ORANGE_50};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.size.m3};
`;

export const AvatarInitial = styled.Text`
  color: ${theme.colors.ORANGE_200};
  font-size: ${theme.font.size.m8};
  font-weight: ${theme.font.weight.bold};
`;

export const Name = styled.Text`
  color: ${theme.colors.GRAY_700};
  text-align: center;
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
`;

export const Email = styled.Text`
  color: ${theme.colors.GRAY_300};
  text-align: center;
  font-size: ${theme.font.size.m4};
  margin-top: ${theme.size.m1};
`;

export const FormCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m5};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const InfoContainer = styled.View`
  gap: ${theme.size.m4};
`;

export const TitleInfoContainer = styled.View`
  align-items: flex-start;
  gap: ${theme.size.m2};
  flex: 1;
`;

export const FieldLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
`;

export const FieldIconBadge = styled.View`
  width: 28px;
  height: 28px;
  border-radius: ${theme.size.m2};
  background-color: ${theme.colors.ORANGE_50};
  align-items: center;
  justify-content: center;
`;

export const InfoTitle = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const StreetNumberInputContainer = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const InfoInputContainer = styled.View<{ isEditing?: boolean }>`
  border-width: 1.5px;
  border-radius: ${theme.size.m3};
  border-color: ${({ isEditing }) =>
    isEditing ? theme.colors.ORANGE_100 : theme.colors.GRAY_200};
  background-color: ${({ isEditing }) =>
    isEditing ? theme.colors.WHITE : theme.colors.GRAY_100};
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-horizontal: ${theme.size.m3};
  height: 48px;
`;

export const InfoInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  color: ${theme.colors.GRAY_700};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.medium};
  border-radius: ${theme.size.m1};
  width: 100%;
`;

export const SelectInput = styled(Picker<string>)`
  color: ${theme.colors.GRAY_700};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m4};
  border-radius: ${theme.size.m1};
  width: 100%;
  margin-left: -${theme.size.m2};
`;

export const SelectInputItem = Picker.Item;

export const ButtonsContainer = styled.View`
  gap: ${theme.size.m3};
  margin-top: ${theme.size.m5};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${theme.colors.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${theme.size.m6};
  gap: ${theme.size.m4};
`;

export const ModalTitle = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const ModalMessage = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
`;

export const ModalActionsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;
