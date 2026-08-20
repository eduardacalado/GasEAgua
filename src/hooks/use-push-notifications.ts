import { useAppSelector } from "@hooks/useAppSelector";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { registerPushToken } from "src/libs/notifications/registerPushToken";
import { navigateToOrderDetail } from "src/routes/navigation-ref";

function getOrderIdFromNotificationData(
  notificationData: Record<string, unknown> | undefined
): number | null {
  const orderIdValue = notificationData?.orderId;
  const orderId = Number(orderIdValue);
  const hasValidOrderId = Number.isFinite(orderId) && orderId > 0;

  if (!hasValidOrderId) {
    return null;
  }

  return orderId;
}

function handleNotificationResponse(
  response: Notifications.NotificationResponse | null
) {
  if (!response) {
    return;
  }

  const orderId = getOrderIdFromNotificationData(
    response.notification.request.content.data
  );

  if (orderId === null) {
    return;
  }

  navigateToOrderDetail(orderId);
}

export function usePushNotifications() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    registerPushToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    Notifications.getLastNotificationResponseAsync().then(
      handleNotificationResponse
    );

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated]);
}
