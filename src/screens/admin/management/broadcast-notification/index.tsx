import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Modal, Platform, Pressable } from "react-native";
import theme from "src/styles/theme";
import { useBroadcastNotification } from "./use-broadcast-notification";
import * as S from "./styles";

export function BroadcastNotificationScreen() {
  const {
    titleInput,
    setTitleInput,
    messageInput,
    setMessageInput,
    isConfirmationModalVisible,
    isSubmitting,
    canOpenConfirmationModal,
    titleMaxLength,
    messageMaxLength,
    openConfirmationModal,
    closeConfirmationModal,
    handleSendBroadcast,
  } = useBroadcastNotification();

  let keyboardAvoidingBehavior: "padding" | undefined;

  if (Platform.OS === "ios") {
    keyboardAvoidingBehavior = "padding";
  }

  return (
    <LinearGradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingBehavior}
      >
        <S.Container>
          <StatusBar style="light" />
          <CustomHeader />

          <S.ScrollContainer>
            <S.Title>Avisar clientes</S.Title>
            <S.Subtitle>
              O aviso chega nos clientes que permitiram notificações no app.
            </S.Subtitle>

            <S.FormCard>
              <S.FieldLabel>Título</S.FieldLabel>
              <S.FieldInput
                value={titleInput}
                onChangeText={setTitleInput}
                placeholder="Ex.: Promoção de hoje"
                placeholderTextColor={theme.colors.GRAY_300}
                maxLength={titleMaxLength}
              />

              <S.FieldLabel>Mensagem</S.FieldLabel>
              <S.MessageInput
                value={messageInput}
                onChangeText={setMessageInput}
                placeholder="Escreva o aviso que os clientes vão receber"
                placeholderTextColor={theme.colors.GRAY_300}
                maxLength={messageMaxLength}
                multiline
              />

              <Button
                title="Enviar para clientes"
                onPress={openConfirmationModal}
                disabled={!canOpenConfirmationModal}
              />
            </S.FormCard>
          </S.ScrollContainer>
        </S.Container>
      </KeyboardAvoidingView>

      <Modal
        visible={isConfirmationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeConfirmationModal}
      >
        <S.ModalOverlay>
          <Pressable style={{ flex: 1 }} onPress={closeConfirmationModal} />
          <S.ModalContent>
            <S.ModalTitle>Enviar notificação?</S.ModalTitle>
            <S.ModalMessage>
              Todos os clientes com o app vão receber este aviso.
            </S.ModalMessage>
            <S.ModalActionsRow>
              <Button
                variant="secondary"
                title="Cancelar"
                onPress={closeConfirmationModal}
                disabled={isSubmitting}
                style={{ flex: 1 }}
              />
              <Button
                title="Enviar"
                onPress={handleSendBroadcast}
                isLoading={isSubmitting}
                disabled={isSubmitting}
                style={{ flex: 1 }}
              />
            </S.ModalActionsRow>
          </S.ModalContent>
        </S.ModalOverlay>
      </Modal>
    </LinearGradientBackground>
  );
}
