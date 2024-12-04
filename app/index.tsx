import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import * as S from "./styles";
import { LinearGradientBackground } from "../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const router = useRouter();

  const handlePressLogin = () => {
    router.push("/login");
  };

  const handlePressSignup = () => {
    router.push("/signup");
  };

  return (
    <S.SafeAreaViewContainer>
      <StatusBar style="light" />

      <LinearGradientBackground />

      <S.Container>
        <S.SignupButton onPress={handlePressSignup}>
          <S.SignupButtonText>Cadastre-se</S.SignupButtonText>
        </S.SignupButton>

        <TouchableOpacity onPress={handlePressLogin}>
          <S.LoginButton
            colors={["#DB1A00", "#ED4200", "#FF6A00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <S.LoginButtonText>Entrar</S.LoginButtonText>
          </S.LoginButton>
        </TouchableOpacity>
      </S.Container>
    </S.SafeAreaViewContainer>
  );
}
