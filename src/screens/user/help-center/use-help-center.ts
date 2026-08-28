import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import { HELP_CENTER_CONTACT } from "src/constants/help-center";

export function useHelpCenter() {
  const handleCallAdmin = async () => {
    try {
      await Linking.openURL(HELP_CENTER_CONTACT.phoneTelUrl);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "Não foi possível abrir o telefone",
      });
    }
  };

  const handleOpenWhatsApp = async () => {
    try {
      await Linking.openURL(HELP_CENTER_CONTACT.whatsAppUrl);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "Não foi possível abrir o WhatsApp",
      });
    }
  };

  const handleCopyPhoneNumber = async () => {
    await Clipboard.setStringAsync(HELP_CENTER_CONTACT.phoneDisplay);
    Toast.show({
      type: "success",
      text1: "Número copiado",
    });
  };

  return {
    handleCallAdmin,
    handleOpenWhatsApp,
    handleCopyPhoneNumber,
  };
}
