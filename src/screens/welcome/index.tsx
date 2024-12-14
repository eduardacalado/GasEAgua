import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import * as S from "./styles";
import { LinearGradientBackground } from "../../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";
import React from "react";

export function WelcomeScreen() {
  const router = useNavigation();

  const handlePressLogin = () => {
    router.navigate("/login");
  };

  const handlePressSignup = () => {
    router.navigate("/signup");
  };

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Container>
          <S.SignupButton onPress={handlePressSignup}>
            <S.SignupButtonText>Cadastre-se</S.SignupButtonText>
          </S.SignupButton>

          <S.LoginButton onPress={handlePressLogin}>
            <S.LoginButtonGradient
              colors={["#DB1A00", "#ED4200", "#FF6A00"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              <S.LoginButtonText>Entrar</S.LoginButtonText>
            </S.LoginButtonGradient>
          </S.LoginButton>
        </S.Container>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
