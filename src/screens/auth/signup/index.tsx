import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { postLogin, postSignup } from "src/services/auth";
import * as yup from "yup";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import * as S from "./styles";

const addressSchema = yup.object({
  street: yup.string(),
  reference: yup.string().required("Infome uma referência do seu endereço"),
  local: yup.string().required("Informe sua localidade"),
  number: yup.string(),
});

const schema = yup.object({
  username: yup.string().required("Infome seu nome"),
  address: addressSchema,
  phonenumber: yup.string().required("Infome seu número de celular"),
  email: yup.string().email("Email inválido").required("Infome seu email"),
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 dígitos")
    .required("Informe uma senha"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePressHome(data: yup.InferType<typeof schema>) {
    const { username, email, password, phonenumber, address } = data;

    setIsLoading(true);
    try {
      await postSignup({
        username,
        email,
        password,
        telephone: phonenumber,
        address,
      });

      const authDates = await postLogin({ email, password });

      Toast.show({
        type: "success",
        text1: "Usuário cadastrado com sucesso!",
      });
      dispatch(authActions.updateAuthStore({ isAuthenticated: true }));
      dispatch(userActions.saveUser(authDates));
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.SafeAreaViewContainer>
          <StatusBar style="light" />

          <S.Container>
            <S.Title>Preencha os campos para fazer cadastro!</S.Title>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialIcons name="person" size={20} color="#7e7e7e" />
                  <S.Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.username && (
              <S.LabelError>{errors.username?.message}</S.LabelError>
            )}

            <Controller
              control={control}
              name="address.local"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    placeholder="Cidade/Engenho"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.address?.local && (
              <S.LabelError>{errors.address?.local?.message}</S.LabelError>
            )}

            <Controller
              control={control}
              name="address.street"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    placeholder="Rua (caso cidade)"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.address?.street && (
              <S.LabelError>{errors.address?.street?.message}</S.LabelError>
            )}

            <Controller
              control={control}
              name="address.number"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    placeholder="Número (caso cidade)"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.address?.number && (
              <S.LabelError>{errors.address?.number?.message}</S.LabelError>
            )}

            <Controller
              control={control}
              name="address.reference"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    placeholder="Referência"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.address?.reference && (
              <S.LabelError>{errors.address?.reference?.message}</S.LabelError>
            )}

            <Controller
              control={control}
              name="phonenumber"
              render={({ field: { onChange, value } }) => (
                <S.InputArea>
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color="#7e7e7e"
                  />
                  <S.Input
                    placeholder="Número de telefone"
                    onChangeText={onChange}
                    value={value}
                  />
                </S.InputArea>
              )}
            />
            {errors.phonenumber && (
              <S.LabelError>{errors.phonenumber?.message}</S.LabelError>
            )}

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
              onPress={handleSubmit(handlePressHome)}
              disabled={isLoading}
            >
              <S.SignUpButton
                colors={["#DB1A00", "#ED4200", "#FF6A00"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <S.SignUpButtonText>Cadastrar</S.SignUpButtonText>
              </S.SignUpButton>
            </TouchableOpacity>
          </S.Container>
        </S.SafeAreaViewContainer>
      </ScrollView>
    </LinearGradientBackground>
  );
}
