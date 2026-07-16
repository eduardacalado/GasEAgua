import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import * as S from "./styles";

export function WelcomeScreen() {
  const navigation = useNavigation<RootNavigatorRoutesProps>();

  const handlePressLogin = () => {
    navigation.navigate("login");
  };

  const handlePressSignup = () => {
    navigation.navigate("signup");
  };

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Container>
          <S.BrandBadge>
            <S.BrandImage
              source={require("../../../../assets/icon.png")}
              contentFit="contain"
            />
          </S.BrandBadge>

          <S.SignupButton onPress={handlePressSignup} activeOpacity={0.85}>
            <S.SignupButtonText>Cadastre-se</S.SignupButtonText>
          </S.SignupButton>

          <S.LoginButton onPress={handlePressLogin} activeOpacity={0.85}>
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
