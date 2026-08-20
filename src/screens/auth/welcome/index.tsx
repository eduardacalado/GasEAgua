import { Button } from "@components/button";
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
    <LinearGradientBackground variant="fullscreen">
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.BrandSection>
          <S.BrandBadge>
            <S.BrandImage
              source={require("../../../../assets/icon.png")}
              contentFit="cover"
            />
          </S.BrandBadge>
          <S.Title>Bem-vindo</S.Title>
        </S.BrandSection>

        <S.Actions>
          <Button
            variant="highlight"
            title="Entrar"
            onPress={handlePressLogin}
          />
          <Button
            variant="secondary"
            title="Cadastre-se"
            onPress={handlePressSignup}
          />
        </S.Actions>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
