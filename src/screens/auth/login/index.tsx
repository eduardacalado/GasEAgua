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
import { authSessionStorage } from "src/libs/storage/authSessionStorage";
import { postLogin } from "src/services/auth";
import theme from "src/styles/theme";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      await authSessionStorage.save(authDates);
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
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="light" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <S.Container>
              <S.Title>Preencha os campos para fazer login!</S.Title>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <S.InputArea>
                    <S.InputIconBadge>
                      <MaterialIcons
                        name="alternate-email"
                        size={16}
                        color={theme.colors.ORANGE_200}
                      />
                    </S.InputIconBadge>
                    <S.Input
                      placeholder="Email"
                      placeholderTextColor={theme.colors.GRAY_300}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
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
                    <S.InputIconBadge>
                      <MaterialIcons
                        name="lock-outline"
                        size={16}
                        color={theme.colors.ORANGE_200}
                      />
                    </S.InputIconBadge>
                    <S.Input
                      placeholder="Senha"
                      placeholderTextColor={theme.colors.GRAY_300}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsPasswordVisible((isVisible) => !isVisible)
                      }
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name={
                          isPasswordVisible ? "visibility" : "visibility-off"
                        }
                        size={22}
                        color={theme.colors.GRAY_300}
                      />
                    </TouchableOpacity>
                  </S.InputArea>
                )}
              />
              {errors.password && (
                <S.LabelError>{errors.password?.message}</S.LabelError>
              )}

              <TouchableOpacity
                onPress={handleSubmit(handleLogin)}
                disabled={isLoading}
                activeOpacity={0.85}
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
