import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ProductName } from "src/types/stock";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { AdminNavigatorRoutesProps } from "../../../routes/admin.routes";
import * as S from "./styles";

export function Home() {
  const navigation = useNavigation<AdminNavigatorRoutesProps>();

  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const formattedName = name?.split(" ")?.[0];

  const handlePressProfile = () => {
    navigation.navigate("userProfile");
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Title>Olá, {formattedName}!</S.Title>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
