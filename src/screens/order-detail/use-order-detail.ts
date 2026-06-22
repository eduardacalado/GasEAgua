import { useAppSelector } from "@hooks/useAppSelector";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { concludeOrder, getOrderById } from "src/services/order";
import { ORDER_STATUS_OPTIONS } from "src/helpers/order-status";
import { OrderDetailProps, OrderStatusProps } from "src/types/orders";

const paymentStateLabels: Record<string, string> = {
  PENDENTE: "Pendente",
  PAGO: "Pago",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGO: "Parcialmente pago",
};

export function useOrderDetail(orderId: number) {
  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const isAdminView = role === "ADMIN";
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
      await concludeOrder({ orderId, status });
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

  const getPaymentStateLabel = (paymentState: string) => {
    return paymentStateLabels[paymentState] ?? paymentState;
  };

  useEffect(() => {
    loadOrderDetail();
  }, [loadOrderDetail]);

  return {
    orderDetail,
    isLoading,
    isUpdatingStatus,
    isAdminView,
    orderStatusOptions: ORDER_STATUS_OPTIONS,
    updateOrderStatus,
    getPaymentStateLabel,
    reloadOrderDetail: loadOrderDetail,
  };
}
