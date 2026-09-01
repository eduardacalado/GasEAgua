import { errorHandler } from "@utils/error-handler";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { postNotificationToken } from "src/services/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function configureAndroidNotificationChannel() {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
  });
}

type GetExpoPushTokenOptions = {
  requestPermission?: boolean;
};

export async function getExpoPushToken(
  options: GetExpoPushTokenOptions = {}
): Promise<string | null> {
  const shouldRequestPermission = options.requestPermission !== false;

  if (Platform.OS === "web" || !Device.isDevice) {
    return null;
  }

  const existingPermission = await Notifications.getPermissionsAsync();
  let permissionStatus = existingPermission.status;

  if (permissionStatus !== "granted" && shouldRequestPermission) {
    const requestedPermission = await Notifications.requestPermissionsAsync();
    permissionStatus = requestedPermission.status;
  }

  if (permissionStatus !== "granted") {
    if (shouldRequestPermission) {
      Toast.show({
        type: "error",
        text2:
          "Permissão de notificações negada. Ative nas configurações para receber avisos de pedidos.",
      });
    }
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const expoPushToken = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  return expoPushToken.data;
}

export async function registerPushToken(): Promise<void> {
  try {
    await configureAndroidNotificationChannel();
    const token = await getExpoPushToken();

    if (!token) {
      return;
    }

    await postNotificationToken(token);
  } catch (error) {
    errorHandler(error, "Não foi possível ativar as notificações.");
  }
}
