import { createNavigationContainerRef } from "@react-navigation/native";

type OrderDetailRoute = {
  orderDetail: { orderId: number };
};

export const navigationRef = createNavigationContainerRef<OrderDetailRoute>();

let pendingOrderId: number | null = null;

export function navigateToOrderDetail(orderId: number) {
  if (!navigationRef.isReady()) {
    pendingOrderId = orderId;
    return;
  }

  navigationRef.navigate("orderDetail", { orderId });
}

export function handleNavigationReady() {
  if (pendingOrderId === null) {
    return;
  }

  const orderId = pendingOrderId;
  pendingOrderId = null;
  navigationRef.navigate("orderDetail", { orderId });
}
