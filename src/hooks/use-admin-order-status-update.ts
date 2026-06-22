import { useState } from "react";
import Toast from "react-native-toast-message";
import { ORDER_STATUS_OPTIONS } from "src/helpers/order-status";
import { concludeOrder } from "src/services/order";
import { OrderDetailProps, OrderStatusProps } from "src/types/orders";

export function useAdminOrderStatusUpdate(
  orderId: number,
  orderDetail: OrderDetailProps | null,
  reloadOrderDetail: () => Promise<void>
) {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const updateOrderStatus = async (status: OrderStatusProps) => {
    if (!orderDetail || orderDetail.status === status) {
      return;
    }

    setIsUpdatingStatus(true);

    try {
      await concludeOrder({ orderId, status });
      await reloadOrderDetail();
      Toast.show({
        type: "success",
        text2: "Status atualizado",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return {
    isUpdatingStatus,
    orderStatusOptions: ORDER_STATUS_OPTIONS,
    updateOrderStatus,
  };
}
