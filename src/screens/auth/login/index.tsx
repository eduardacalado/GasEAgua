import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import { postLogin } from "src/services/auth";
import * as yup from "yup";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground";
import * as S from "./styles";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Infome seu email"),
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 dígitos")
    .required("Informe sua senha"),
});

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: yup.InferType<typeof schema>) => {
    const { email, password } = data;

    setIsLoading(true);
    try {
      const authDates = await postLogin({ email, password });
      console.log({ authDates });
      dispatch(userActions.saveUser(authDates));
      dispatch(authActions.updateAuthStore({ isAuthenticated: true }));
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradientBackground>
      <S.ScrollViewContainer
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="light" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <S.Container>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <S.InputArea>
                    <MaterialIcons
                      name="alternate-email"
                      size={20}
                      color="#7e7e7e"
                    />
                    <S.Input
                      placeholder="Email"
                      onChangeText={onChange}
                      value={value}
                    />
                  </S.InputArea>
                )}
              />
              {errors.email && (
                <S.LabelError>{errors.email?.message}</S.LabelError>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <S.InputArea>
                    <MaterialIcons
                      name="lock-outline"
                      size={20}
                      color="#7e7e7e"
                    />
                    <S.Input
                      placeholder="Senha"
                      onChangeText={onChange}
                      value={value}
                    />
                  </S.InputArea>
                )}
              />
              {errors.password && (
                <S.LabelError>{errors.password?.message}</S.LabelError>
              )}

              <TouchableOpacity
                onPress={handleSubmit(handleLogin)}
                disabled={isLoading}
              >
                <S.LoginButton
                  colors={["#DB1A00", "#ED4200", "#FF6A00"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                >
                  <S.LoginButtonText>Entrar</S.LoginButtonText>
                </S.LoginButton>
              </TouchableOpacity>
            </S.Container>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </S.ScrollViewContainer>
    </LinearGradientBackground>
  );
}
