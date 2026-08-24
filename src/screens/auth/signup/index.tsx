import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
  ENGENHO_OPTIONS,
} from "src/constants/localOptions";
import theme from "src/styles/theme";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import * as S from "./styles";
import { useSignup } from "./use-signup";

export function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
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

  const handlePressLogin = () => {
    navigation.navigate("login");
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((isVisible) => !isVisible);
  };

  const passwordVisibilityIcon = isPasswordVisible
    ? "visibility"
    : "visibility-off";

  return (
    <LinearGradientBackground variant="fullscreen">
      <StatusBar style="light" />
      <S.HeaderContainer>
        <CustomHeader showHelpButton={false} />
      </S.HeaderContainer>
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
                <S.Title>Crie sua conta</S.Title>
              </S.Hero>

              <S.Sheet>
                <S.FormStack>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Nome</S.FieldLabel>
                        <S.InputRow>
                          <S.Input
                            placeholder="Nome"
                            placeholderTextColor={theme.colors.GRAY_300}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="words"
                          />
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />
                  {errors.username && (
                    <S.LabelError>{errors.username?.message}</S.LabelError>
                  )}

                  <Controller
                    control={control}
                    name="address.local"
                    render={({ field: { onChange } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Localidade</S.FieldLabel>
                        <S.InputRow>
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
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />

                  {mainLocal === DEFAULT_ENGENHO && (
                    <S.FieldGroup>
                      <S.FieldLabel>Engenho</S.FieldLabel>
                      <S.InputRow>
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
                      </S.InputRow>
                    </S.FieldGroup>
                  )}

                  {mainLocal !== DEFAULT_ENGENHO && (
                    <S.StreetNumberInputContainer>
                      <Controller
                        control={control}
                        name="address.street"
                        render={({ field: { onChange, value } }) => (
                          <S.CompactFieldGroup>
                            <S.FieldLabel>Rua</S.FieldLabel>
                            <S.InputRow>
                              <S.Input
                                value={value}
                                onChangeText={onChange}
                                placeholder="Rua"
                                placeholderTextColor={theme.colors.GRAY_300}
                                autoCapitalize="words"
                              />
                            </S.InputRow>
                          </S.CompactFieldGroup>
                        )}
                      />
                      <Controller
                        control={control}
                        name="address.number"
                        render={({ field: { onChange, value } }) => (
                          <S.CompactFieldGroup>
                            <S.FieldLabel>Número</S.FieldLabel>
                            <S.InputRow>
                              <S.Input
                                value={value}
                                onChangeText={onChange}
                                placeholder="Número"
                                placeholderTextColor={theme.colors.GRAY_300}
                                keyboardType="number-pad"
                              />
                            </S.InputRow>
                          </S.CompactFieldGroup>
                        )}
                      />
                    </S.StreetNumberInputContainer>
                  )}
                  {errors.address?.local && (
                    <S.LabelError>{errors.address?.local?.message}</S.LabelError>
                  )}
                  {errors.address?.street && (
                    <S.LabelError>
                      {errors.address?.street?.message}
                    </S.LabelError>
                  )}
                  {errors.address?.number && (
                    <S.LabelError>
                      {errors.address?.number?.message}
                    </S.LabelError>
                  )}

                  <Controller
                    control={control}
                    name="address.reference"
                    render={({ field: { onChange, value } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Referência</S.FieldLabel>
                        <S.InputRow>
                          <S.Input
                            placeholder="Referência"
                            placeholderTextColor={theme.colors.GRAY_300}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="sentences"
                          />
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />
                  {errors.address?.reference && (
                    <S.LabelError>
                      {errors.address?.reference?.message}
                    </S.LabelError>
                  )}

                  <Controller
                    control={control}
                    name="phonenumber"
                    render={({ field: { onChange, value } }) => (
                      <S.FieldGroup>
                        <S.FieldLabel>Telefone</S.FieldLabel>
                        <S.InputRow>
                          <S.Input
                            placeholder="Número de telefone"
                            placeholderTextColor={theme.colors.GRAY_300}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="phone-pad"
                          />
                        </S.InputRow>
                      </S.FieldGroup>
                    )}
                  />
                  {errors.phonenumber && (
                    <S.LabelError>{errors.phonenumber?.message}</S.LabelError>
                  )}

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
                              name={passwordVisibilityIcon}
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
                    title="Cadastrar"
                    onPress={handleSubmit(handlePressHome)}
                    isLoading={isLoading}
                    disabled={isLoading}
                  />

                  <S.LoginRow>
                    <S.LoginHint>Já tem conta?</S.LoginHint>
                    <Button
                      variant="tertiary"
                      title="Entrar"
                      onPress={handlePressLogin}
                    />
                  </S.LoginRow>
                </S.FormStack>
              </S.Sheet>
            </S.Content>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </S.ScrollViewContainer>
    </LinearGradientBackground>
  );
}
