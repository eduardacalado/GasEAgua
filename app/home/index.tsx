import * as S from "./styles";
import { LinearGradientBackground } from "../../components/LinearGradientBackground/index";
import { TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const handlePressOrder = () => {
    router.push("../order");
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
              style={{
                flex: 1,
              }}
              source={require("../../assets/images/gasLogo.png")}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
            <S.ButtonText>Pedir Gás</S.ButtonText>
          </S.OrderButton>

          <S.OrderButton>
            <S.ButtonImage
            style={{
              flex: 1,
            }}
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
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
