import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ProductName } from "src/types/stock";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { UserNavigatorRoutesProps } from "../../../routes/user.routes";
import * as S from "./styles";

export function Home() {
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const formattedName = name?.split(" ")?.[0];

  const handlePressOrder = (type: ProductName) => {
    navigation.navigate("userCreateOrder", {
      type,
    });
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.HeaderContent>
          <S.Title>Olá, {formattedName}!</S.Title>
          <S.SubTitle>O que gostaria de pedir?</S.SubTitle>
        </S.HeaderContent>

        <S.ButtonsContainer>
          <S.OrderCard onPress={() => handlePressOrder("GAS")}>
            <S.ButtonImage
              source={require("../../../../assets/images/gasLogo.png")}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
            <S.ButtonText>Pedir Gás</S.ButtonText>
          </S.OrderCard>

          <S.OrderCard onPress={() => handlePressOrder("WATER")}>
            <S.ButtonImage
              source={require("../../../../assets/images/aguaLogo.png")}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <S.ButtonText>Pedir Água</S.ButtonText>
          </S.OrderCard>
        </S.ButtonsContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
