import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground";
import * as S from "./styles";

export function Login() {
  const navigation = useNavigation<RootNavigatorRoutesProps>();

  const handlePressHome = () => {
    navigation.navigate("userHome");
  };

  return (
    <LinearGradientBackground>
      <S.ScrollViewContainer>
        <StatusBar style="light" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
              keyboardShouldPersistTaps="handled"
            >
              <S.Container>
                <S.InputArea>
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input placeholder="Email" />
                </S.InputArea>

                <S.InputArea>
                  <MaterialIcons
                    name="lock-outline"
                    size={20}
                    color="#7e7e7e"
                  />
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
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </S.ScrollViewContainer>
    </LinearGradientBackground>
  );
}
