import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import theme from "src/styles/theme";
import { usePixSettings } from "./use-pix-settings";
import * as S from "./styles";

export function PixSettingsScreen() {
  const {
    pixKeyInput,
    setPixKeyInput,
    recipientNameInput,
    setRecipientNameInput,
    savedPixKey,
    savedRecipientName,
    isLoading,
    isSubmitting,
    shouldShowSavedSummary,
    shouldShowCancelButton,
    handleStartEditing,
    handleCancelEditing,
    handleSavePaymentSettings,
  } = usePixSettings();

  if (isLoading) {
    return (
      <LinearGradientBackground>
        <S.Container>
          <StatusBar style="light" />
          <CustomHeader />
          <ActivityIndicator size="large" color="#FFFFFF" />
        </S.Container>
      </LinearGradientBackground>
    );
  }

  return (
    <LinearGradientBackground>
      <S.Container>
        <StatusBar style="light" />
        <CustomHeader />

        <S.ScrollContainer>
          <S.Title>Pagamento Pix</S.Title>
          <S.Subtitle>
            Essas informações aparecem nos pedidos com pagamento pendente.
          </S.Subtitle>

          {shouldShowSavedSummary ? (
            <S.FormCard>
              <S.SavedHeader>
                <Feather
                  name="check-circle"
                  size={18}
                  color={theme.colors.GREEN}
                />
                <S.SavedBadge>
                  <S.SavedBadgeText>Pix configurado</S.SavedBadgeText>
                </S.SavedBadge>
              </S.SavedHeader>

              <S.InfoBlock>
                <S.FieldLabel>Nome do recebedor</S.FieldLabel>
                <S.InfoValue>{savedRecipientName}</S.InfoValue>
              </S.InfoBlock>

              <S.InfoBlock>
                <S.FieldLabel>Chave Pix</S.FieldLabel>
                <S.InfoValue>{savedPixKey}</S.InfoValue>
              </S.InfoBlock>

              <Button
                variant="tertiary"
                title="Editar"
                onPress={handleStartEditing}
              />
            </S.FormCard>
          ) : (
            <S.FormCard>
              <S.FieldLabel>Nome do recebedor</S.FieldLabel>
              <S.FieldInput
                value={recipientNameInput}
                onChangeText={setRecipientNameInput}
                placeholder="Ex.: Gas e Água"
                placeholderTextColor={theme.colors.GRAY_300}
              />

              <S.FieldLabel>Chave Pix</S.FieldLabel>
              <S.FieldInput
                value={pixKeyInput}
                onChangeText={setPixKeyInput}
                placeholder="CPF, e-mail, telefone ou chave aleatória"
                placeholderTextColor={theme.colors.GRAY_300}
                autoCapitalize="none"
              />

              <S.ButtonsRow>
                {shouldShowCancelButton && (
                  <Button
                    variant="secondary"
                    title="Cancelar"
                    onPress={handleCancelEditing}
                    style={{ flex: 1 }}
                  />
                )}

                <Button
                  title="Salvar"
                  onPress={handleSavePaymentSettings}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  style={{ flex: 1 }}
                />
              </S.ButtonsRow>
            </S.FormCard>
          )}
        </S.ScrollContainer>
      </S.Container>
    </LinearGradientBackground>
  );
}
