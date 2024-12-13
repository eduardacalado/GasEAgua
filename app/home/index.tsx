import * as S from "./styles";
import { LinearGradientBackground } from "../../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialIcons";
import Tab from "../(tabs)/index"
import TabLayout from "../(tabs)/_layout";

export default function Home() {
  const router = useRouter();

  const handlePressOrder = () => {
    router.push("../order");
  };

  const handlePressProfile = () => {
    router.push("../profile")
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />
        <S.ButtonsContainer>
          <S.OrderButton onPress={handlePressOrder}>
            <S.ButtonImage
              source={require("../../assets/images/gasLogo.png")}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
            <S.ButtonText>Pedir Gás</S.ButtonText>
          </S.OrderButton>

          <S.OrderButton>
            <S.ButtonImage
              source={require("../../assets/images/aguaLogo.png")}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <S.ButtonText>Pedir Água</S.ButtonText>
          </S.OrderButton>
        </S.ButtonsContainer>

        <S.Title>Olá, Eduardo!</S.Title>

        <S.SubTitle>O que gostaria de pedir?</S.SubTitle>

        <S.ProfileButtonContainer>
          <S.ProfileButton onPress={handlePressProfile}>
            <MaterialCommunityIcons name="account-circle" size={35} color="#DB1A00" />
          </S.ProfileButton>
        </S.ProfileButtonContainer>
        <Tab></Tab>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
