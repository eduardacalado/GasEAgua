import { errorHandler } from "@utils/error-handler";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { postBroadcastToUsers } from "src/services/notifications";

const BROADCAST_TITLE_MAX_LENGTH = 100;
const BROADCAST_MESSAGE_MAX_LENGTH = 500;

export function useBroadcastNotification() {
  const [titleInput, setTitleInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedTitle = titleInput.trim();
  const trimmedMessage = messageInput.trim();
  const canOpenConfirmationModal =
    trimmedTitle.length > 0 && trimmedMessage.length > 0 && !isSubmitting;

  function openConfirmationModal() {
    if (!canOpenConfirmationModal) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Informe o título e a mensagem da notificação.",
      });
      return;
    }

    setIsConfirmationModalVisible(true);
  }

  function closeConfirmationModal() {
    if (isSubmitting) {
      return;
    }

    setIsConfirmationModalVisible(false);
  }

  function closeModalThenShowFeedback(showFeedback: () => void) {
    setIsConfirmationModalVisible(false);
    setTimeout(showFeedback, 300);
  }

  async function handleSendBroadcast() {
    setIsSubmitting(true);

    try {
      await postBroadcastToUsers({
        title: trimmedTitle,
        message: trimmedMessage,
      });

      setTitleInput("");
      setMessageInput("");
      closeModalThenShowFeedback(() => {
        Toast.show({
          type: "success",
          text1: "Notificação enviada",
          text2: "O aviso está a caminho dos clientes.",
        });
      });
    } catch (error) {
      closeModalThenShowFeedback(() => {
        errorHandler(error, "Erro ao enviar a notificação.");
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    titleInput,
    setTitleInput,
    messageInput,
    setMessageInput,
    isConfirmationModalVisible,
    isSubmitting,
    canOpenConfirmationModal,
    titleMaxLength: BROADCAST_TITLE_MAX_LENGTH,
    messageMaxLength: BROADCAST_MESSAGE_MAX_LENGTH,
    openConfirmationModal,
    closeConfirmationModal,
    handleSendBroadcast,
  };
}
