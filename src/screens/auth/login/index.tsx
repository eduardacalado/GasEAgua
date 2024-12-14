import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground";
import * as S from "./styles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { RootNavigatorRoutesProps } from "@routes/index";

export function Login() {
  const navigation = useNavigation<RootNavigatorRoutesProps>();

  const handlePressHome = () => {
    navigation.navigate("userHome");
  };

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Container>
          <S.InputArea>
            <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
            <S.Input placeholder="Email" />
          </S.InputArea>

          <S.InputArea>
            <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
            <S.Input placeholder="Senha" />
          </S.InputArea>

          <TouchableOpacity onPress={handlePressHome}>
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
    </LinearGradientBackground>
  );
}
