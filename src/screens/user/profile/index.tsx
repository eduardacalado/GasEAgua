import { CustomHeader } from "@components/custom-header";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { authActions } from "@store/modules/auth/slice";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import theme from "src/styles/theme";
import * as S from "./styles";
import { postUpdateUser } from "src/services/user";
import Toast from "react-native-toast-message";
import { isAxiosError } from "axios";

export function UserProfile() {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const dispatch = useAppDispatch();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  function handleLogout() {
    dispatch(authActions.clearAuthData());
  }

  const {
    user: { address, email, name: username, telephone },
  } = useAppSelector((state) => state.user);

  const [addressFields, setAddressFields] = useState({
    street: address?.street || "",
    number: address?.number || "",
    reference: address?.reference,
    local: address?.local,
  });

  function handleEditProfile() {
    setIsInputDisabled(false);
  }

  async function handleUpdateUserData() {
    setIsLoading(true);
    try {
      await postUpdateUser({
        username,
        telephone,
        address: addressFields,
      });

      Toast.show({
        type: "success",
        text1: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
      setIsInputDisabled(true);
    }
  }
  return (
    <S.SafeAreaViewContainer>
      <StatusBar style="dark" />
      <S.ScrollViewBackground>
        <S.MapImage
          source={require("../../../../assets/images/map.jpg")}
          placeholder={{ blurhash }}
          contentFit="cover"
        >
          <CustomHeader color={theme.colors.ORANGE_300} />
        </S.MapImage>
        <S.Container>
          <S.ProfileImageContainer>
            <S.ProfileImageButton>
              <S.ProfileImage />
            </S.ProfileImageButton>
          </S.ProfileImageContainer>

          <S.Name>{username}</S.Name>
          <S.Email>{email}</S.Email>

          <S.InfoContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Local</S.InfoTitle>
              <S.InfoInput
                editable={!isInputDisabled}
                value={addressFields.local}
                onChangeText={(text: string) =>
                  setAddressFields({ ...addressFields, local: text })
                }
              />
            </S.TitleSubtitleContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Rua</S.InfoTitle>
              <S.InfoInput
                editable={!isInputDisabled}
                value={addressFields.street}
                onChangeText={(text: string) =>
                  setAddressFields({ ...addressFields, street: text })
                }
              />
            </S.TitleSubtitleContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Número</S.InfoTitle>
              <S.InfoInput
                editable={!isInputDisabled}
                value={addressFields.number}
                onChangeText={(text: string) =>
                  setAddressFields({ ...addressFields, number: text })
                }
              />
            </S.TitleSubtitleContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Referência</S.InfoTitle>
              <S.InfoInput
                editable={!isInputDisabled}
                value={addressFields.reference}
                onChangeText={(text: string) =>
                  setAddressFields({ ...addressFields, reference: text })
                }
              />
            </S.TitleSubtitleContainer>
          </S.InfoContainer>

          <S.AlterInfoButtonContainer>
            <S.AlterInfoButton
              onPress={
                isInputDisabled ? handleEditProfile : handleUpdateUserData
              }
              isLoading={isLoading}
            >
              <S.AlterInfoButtonText>
                {isInputDisabled ? "Editar perfil" : "Salvar"}
              </S.AlterInfoButtonText>
            </S.AlterInfoButton>
            <S.LogoutButton onPress={handleLogout} disabled={isInputDisabled}>
              <S.AlterInfoButtonText>Deslogar</S.AlterInfoButtonText>
            </S.LogoutButton>
          </S.AlterInfoButtonContainer>
        </S.Container>
      </S.ScrollViewBackground>
    </S.SafeAreaViewContainer>
  );
}
