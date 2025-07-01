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

export function UserProfile() {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const dispatch = useAppDispatch();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  function handleLogout() {
    dispatch(authActions.clearAuthData());
  }
  
  const {
    user: { address, name, email },
  } = useAppSelector((state) => state.user);

  function handleEditProfile() {
    setIsInputDisabled(false);
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

          <S.Name>{name}</S.Name>
          <S.Email>{email}</S.Email>

          <S.InfoContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Eneço</S.InfoTitle>
              <S.InfoInput
                editable={!isInputDisabled}
                value={`${address?.street}, ${address?.number}`}
              />
            </S.TitleSubtitleContainer>

            <S.TitleSubtitleContainer>
              <S.InfoTitle>Referência</S.InfoTitle>
              <S.InfoInput>{address?.reference}</S.InfoInput>
            </S.TitleSubtitleContainer>
          </S.InfoContainer>

          <S.AlterInfoButtonContainer>
            <S.AlterInfoButton>
              <S.AlterInfoButtonText onPress={handleEditProfile}>Editar perfil</S.AlterInfoButtonText>
            </S.AlterInfoButton>
            <S.AlterInfoButton onPress={handleLogout}>
              <S.AlterInfoButtonText>Deslogar</S.AlterInfoButtonText>
            </S.AlterInfoButton>
          </S.AlterInfoButtonContainer>
        </S.Container>
      </S.ScrollViewBackground>
    </S.SafeAreaViewContainer>
  );
}
