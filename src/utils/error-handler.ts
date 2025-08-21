import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

export function errorHandler(error: any, defaultMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.") {
    if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
    } else {
        Toast.show({
          type: "error",
          text2: defaultMessage,
        });
    }
}