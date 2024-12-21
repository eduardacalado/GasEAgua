import { TouchableOpacity } from "react-native";
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
import Toast from "react-native-toast-message";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Infome seu email"),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("Informe sua senha"),
})

export function Login() {
  const { control, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  })
  const dispatch = useAppDispatch();

  const handleLogin = async(data: any) => {
    const { email, password } = data;
    
   try {
     const authDates = await postLogin({email: email, password: password})
     dispatch(authActions.updateAuthStore({isAuthenticated: true}))
     dispatch(userActions.saveUser(authDates))
   } catch(error) {

     if (isAxiosError(error)) {
       error.response?.data?.message
       Toast.show({
         type: 'error',
         text1: 'Email ou senha incorretos'
       })
     }
     console.log({error})
   }

    console.log(data.password)
  }

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Container>


          <Controller
            control={control}
            name="email"
            render={({ field: {onChange, value } }) => (
              <S.InputArea>
                <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
                <S.Input
                  placeholder="Email" 
                  onChangeText={onChange}
                  value={value} />
              </S.InputArea>
            )}
          />
          {errors.email && <S.LabelError>{errors.email?.message}</S.LabelError>}

          <Controller
            control={control}
            name="password"
            render={({ field: {onChange, value } }) => (
              <S.InputArea>
                <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
                <S.Input 
                  placeholder="Senha" 
                  onChangeText={onChange} 
                  value={value} />
              </S.InputArea>
            )}
          />
          {errors.password && <S.LabelError>{errors.password?.message}</S.LabelError>}

          <TouchableOpacity onPress={handleSubmit(handleLogin)}>
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
