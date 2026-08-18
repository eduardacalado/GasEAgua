import { CustomHeader } from "@components/custom-header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import * as S from "./styles";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
  ENGENHO_OPTIONS,
} from "src/constants/localOptions";
import { useSignup } from "./use-signup";

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    handlePressHome,
    isLoading,
    mainLocal,
    setMainLocal,
    selectedEngenho,
    setSelectedEngenho,
    setValue,
  } = useSignup();
  return (
    <LinearGradientBackground>
      <StatusBar style="light" />
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.SafeAreaViewContainer>
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
                  <S.SelectInput
                    selectedValue={mainLocal}
                    onValueChange={(value: string) => {
                      onChange(value);
                      setMainLocal(value);
                      if (value === DEFAULT_CITY) {
                        setValue("address.local", DEFAULT_CITY);
                      }
                    }}
                  >
                    <S.SelectInput.Item
                      label={DEFAULT_CITY}
                      value={DEFAULT_CITY}
                    />
                    <S.SelectInput.Item
                      label={DEFAULT_ENGENHO}
                      value={DEFAULT_ENGENHO}
                    />
                  </S.SelectInput>
                </S.InputArea>
              )}
            />

            {mainLocal === DEFAULT_ENGENHO && (
              <S.InputArea>
                <S.SelectInput
                  selectedValue={selectedEngenho}
                  onValueChange={(value: string) => {
                    setSelectedEngenho(value);
                    setValue("address.local", value);
                  }}
                >
                  {ENGENHO_OPTIONS.map((option) => (
                    <S.SelectInput.Item
                      key={option}
                      label={option}
                      value={option}
                    />
                  ))}
                </S.SelectInput>
              </S.InputArea>
            )}

            {mainLocal !== DEFAULT_ENGENHO && (
              <S.StreetNumberInputContainer>
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
                        value={value}
                        onChangeText={onChange}
                        placeholder="Rua"
                      />
                    </S.InputArea>
                  )}
                />
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
                        value={value}
                        onChangeText={onChange}
                        placeholder="Número"
                      />
                    </S.InputArea>
                  )}
                />
              </S.StreetNumberInputContainer>
            )}
            {errors.address?.local && (
              <S.LabelError>{errors.address?.local?.message}</S.LabelError>
            )}
            {errors.address?.street && (
              <S.LabelError>{errors.address?.street?.message}</S.LabelError>
            )}
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
