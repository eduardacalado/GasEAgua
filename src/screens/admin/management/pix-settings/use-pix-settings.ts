import { errorHandler } from "@utils/error-handler";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  getPaymentSettings,
  updatePaymentSettings,
} from "src/services/management";

function hasCompletePaymentSettings(pixKey: string, recipientName: string) {
  return pixKey.trim().length > 0 && recipientName.trim().length > 0;
}

export function usePixSettings() {
  const [pixKeyInput, setPixKeyInput] = useState("");
  const [recipientNameInput, setRecipientNameInput] = useState("");
  const [savedPixKey, setSavedPixKey] = useState("");
  const [savedRecipientName, setSavedRecipientName] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPaymentSettings = useCallback(async () => {
    setIsLoading(true);

    try {
      const paymentSettings = await getPaymentSettings();
      const loadedPixKey = paymentSettings.pix_key;
      const loadedRecipientName = paymentSettings.recipient_name;
      const hasSavedSettings = hasCompletePaymentSettings(
        loadedPixKey,
        loadedRecipientName
      );

      setPixKeyInput(loadedPixKey);
      setRecipientNameInput(loadedRecipientName);
      setSavedPixKey(loadedPixKey);
      setSavedRecipientName(loadedRecipientName);
      setIsEditing(!hasSavedSettings);
    } catch (error) {
      errorHandler(error, "Erro ao carregar configurações Pix.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPaymentSettings();
  }, [loadPaymentSettings]);

  const handleStartEditing = () => {
    setPixKeyInput(savedPixKey);
    setRecipientNameInput(savedRecipientName);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setPixKeyInput(savedPixKey);
    setRecipientNameInput(savedRecipientName);
    setIsEditing(false);
  };

  const handleSavePaymentSettings = async () => {
    const trimmedPixKey = pixKeyInput.trim();
    const trimmedRecipientName = recipientNameInput.trim();

    if (!trimmedPixKey || !trimmedRecipientName) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Informe a chave Pix e o nome do recebedor.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePaymentSettings({
        pix_key: trimmedPixKey,
        recipient_name: trimmedRecipientName,
      });

      setPixKeyInput(trimmedPixKey);
      setRecipientNameInput(trimmedRecipientName);
      setSavedPixKey(trimmedPixKey);
      setSavedRecipientName(trimmedRecipientName);
      setIsEditing(false);

      Toast.show({
        type: "success",
        text1: "Configurações Pix salvas",
      });
    } catch (error) {
      errorHandler(error, "Erro ao salvar configurações Pix.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasSavedPaymentSettings = hasCompletePaymentSettings(
    savedPixKey,
    savedRecipientName
  );
  const shouldShowSavedSummary = hasSavedPaymentSettings && !isEditing;
  const shouldShowCancelButton = hasSavedPaymentSettings && isEditing;

  return {
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
  };
}
