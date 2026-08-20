import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
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

async function getExpoPushToken(): Promise<string | null> {
  if (Platform.OS === "web" || !Device.isDevice) {
    console.log({ error: "Push notifications require a physical device" });
    return null;
  }

  const existingPermission = await Notifications.getPermissionsAsync();
  let permissionStatus = existingPermission.status;

  if (permissionStatus !== "granted") {
    const requestedPermission = await Notifications.requestPermissionsAsync();
    permissionStatus = requestedPermission.status;
  }

  if (permissionStatus !== "granted") {
    console.log({ error: "Push notification permission was not granted" });
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
    console.log({ error });
  }
}
