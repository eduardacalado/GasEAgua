import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getOrderStatusLabel } from "src/helpers/order-status";
import { getOrderById } from "src/services/order";
import { updateDeliveryOrderStatus } from "src/services/delivery";
import { OrderDetailProps, OrderStatusProps } from "src/types/orders";

const DELIVERY_STATUS_OPTIONS = [
  { label: getOrderStatusLabel("PENDENTE"), value: "PENDENTE" as const },
  { label: getOrderStatusLabel("INICIADO"), value: "INICIADO" as const },
  { label: getOrderStatusLabel("FINALIZADO"), value: "FINALIZADO" as const },
];

export function useDeliveryOrderDetail(orderId: number) {
  const [orderDetail, setOrderDetail] = useState<OrderDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadOrderDetail = useCallback(async () => {
    setIsLoading(true);

    try {
      const order = await getOrderById(orderId);
      setOrderDetail(order);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  const updateOrderStatus = async (status: OrderStatusProps) => {
    if (!orderDetail || orderDetail.status === status) {
      return;
    }

    setIsUpdatingStatus(true);

    try {
      await updateDeliveryOrderStatus(orderId, status);
      await loadOrderDetail();
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

  useEffect(() => {
    loadOrderDetail();
  }, [loadOrderDetail]);

  return {
    orderDetail,
    isLoading,
    isUpdatingStatus,
    orderStatusOptions: DELIVERY_STATUS_OPTIONS,
    updateOrderStatus,
  };
}
