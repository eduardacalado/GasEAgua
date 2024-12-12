import * as S from "./styles";
import { StatusBar } from "expo-status-bar";

export default function Profile() {

 const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <S.LinearGradientBackground
        colors={["#DB1A00", "#ED4200", "#FF6A00"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
      <S.SafeAreaViewContainer>
        <StatusBar style="dark" />

        <S.MapImage
        source={require("../../assets/images/map.jpg")}
        placeholder={{ blurhash }}
        contentFit="cover"
        />
      

       <S.ProfileImageContainer>
            <S.ProfileImageButton>
              <S.ProfileImage/>
            </S.ProfileImageButton>
        </S.ProfileImageContainer>
      

        <S.Name>
            Eduardo Florêncio
        </S.Name>
        <S.Email>
          eduardogas2013@hotmail.com
        </S.Email>

        <S.InfoContainer>
          <S.TitleSubtitleContainer>
              <S.InfoTitle>
                  Endereço
              </S.InfoTitle>
              <S.InfoSubitle>
                Rua José Bezerra, N23 B
              </S.InfoSubitle>
          </S.TitleSubtitleContainer>

          <S.TitleSubtitleContainer>
              <S.InfoTitle>
                  Referência
              </S.InfoTitle>
              <S.InfoSubitle>
                Ao lado da loja de panelas
              </S.InfoSubitle>
        </S.TitleSubtitleContainer>
        </S.InfoContainer>

        <S.AlterInfoButtonContainer>
          <S.AlterInfoButton>
            <S.AlterInfoButtonText>
              Editar perfil
            </S.AlterInfoButtonText>
          </S.AlterInfoButton>
        </S.AlterInfoButtonContainer>

      </S.SafeAreaViewContainer>
    </S.LinearGradientBackground>
  );
}
