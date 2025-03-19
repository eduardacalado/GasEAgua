import { CustomHeader } from "@components/custom-header";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { authActions } from "@store/modules/auth/slice";
import { StatusBar } from "expo-status-bar";
import theme from "src/styles/theme";
import * as S from "./styles";

export function UserProfile() {
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const dispatch = useAppDispatch();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  function handleLogout() {
    dispatch(authActions.clearAuthData());
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
          <CustomHeader
            handleBack={() => navigate("userHome")}
            color={theme.colors.background.orange}
          />
        </S.MapImage>
        <S.Container>
          <S.ProfileImageContainer>
            <S.ProfileImageButton>
              <S.ProfileImage />
            </S.ProfileImageButton>
          </S.ProfileImageContainer>

          <S.Name>Eduardo Florêncio</S.Name>
          <S.Email>eduardogas2013@hotmail.com</S.Email>

          <S.InfoContainer>
            <S.TitleSubtitleContainer>
              <S.InfoTitle>Endereço</S.InfoTitle>
              <S.InfoSubitle>Rua José Bezerra, N23 B</S.InfoSubitle>
            </S.TitleSubtitleContainer>

            <S.TitleSubtitleContainer>
              <S.InfoTitle>Referência</S.InfoTitle>
              <S.InfoSubitle>Ao lado da loja de panelas</S.InfoSubitle>
            </S.TitleSubtitleContainer>
          </S.InfoContainer>

          <S.AlterInfoButtonContainer>
            <S.AlterInfoButton>
              <S.AlterInfoButtonText>Editar perfil</S.AlterInfoButtonText>
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
