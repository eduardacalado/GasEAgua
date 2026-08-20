import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
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
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePressSignup = () => {
    navigation.navigate("signup");
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

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
    <LinearGradientBackground variant="fullscreen">
      <StatusBar style="light" />
      <CustomHeader />
      <S.ScrollViewContainer
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <S.Content>
              <S.Hero>
                <S.Title>Olá, entre!</S.Title>
              </S.Hero>

              <S.Sheet>
                <S.FormStack>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Email</S.FieldLabel>
                        <S.InputRow>
                          <S.Input
                            placeholder="Email"
                            placeholderTextColor={theme.colors.GRAY_300}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />
                  {errors.email && (
                    <S.LabelError>{errors.email?.message}</S.LabelError>
                  )}

                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Senha</S.FieldLabel>
                        <S.InputRow>
                          <S.Input
                            placeholder="Senha"
                            placeholderTextColor={theme.colors.GRAY_300}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={!isPasswordVisible}
                          />
                          <TouchableOpacity
                            onPress={handleTogglePasswordVisibility}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            activeOpacity={0.7}
                          >
                            <MaterialIcons
                              name={
                                isPasswordVisible
                                  ? "visibility"
                                  : "visibility-off"
                              }
                              size={22}
                              color={theme.colors.GRAY_300}
                            />
                          </TouchableOpacity>
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />
                  {errors.password && (
                    <S.LabelError>{errors.password?.message}</S.LabelError>
                  )}

                  <Button
                    title="Entrar"
                    onPress={handleSubmit(handleLogin)}
                    isLoading={isLoading}
                    disabled={isLoading}
                  />

                  <S.SignupRow>
                    <S.SignupHint>Não tem conta?</S.SignupHint>
                    <Button
                      variant="tertiary"
                      title="Cadastre-se"
                      onPress={handlePressSignup}
                    />
                  </S.SignupRow>
                </S.FormStack>
              </S.Sheet>
            </S.Content>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </S.ScrollViewContainer>
    </LinearGradientBackground>
  );
}
