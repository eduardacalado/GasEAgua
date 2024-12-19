import { Alert, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground";
import * as S from "./styles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { postLogin } from "src/services/auth";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { useState } from "react";
import { isAxiosError } from "axios";

export function Login() {
  const [email,setEmail] = useState("")
  const [password ,setPassword] = useState("")

  const dispatch = useAppDispatch();

  const handleLogin = async() => {
    try {
      const authDates = await postLogin({email: email, password: password})
      dispatch(authActions.updateAuthStore({isAuthenticated: true}))
      dispatch(userActions.saveUser(authDates))
    } catch(error) {

      if (isAxiosError(error)) {
        error.response?.data?.message
      }
      console.log({error})
    }
  }

  const isDisabled = email.length < 0 && password.length < 0

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Container>
          <S.InputArea>
            <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
            <S.Input placeholder="Email" onChangeText={setEmail}/>
          </S.InputArea>

          <S.InputArea>
            <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
            <S.Input placeholder="Senha" onChangeText={setPassword}/>
          </S.InputArea>

          <TouchableOpacity onPress={handleLogin} disabled={isDisabled}>
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
