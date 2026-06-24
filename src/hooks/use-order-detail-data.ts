import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getOrderById } from "src/services/order";
import { OrderDetailProps } from "src/types/orders";

const paymentStateLabels: Record<string, string> = {
  PENDENTE: "Pendente",
  PAGO: "Pago",
  VENCIDO: "Vencido",
  PARCIALMENTE_PAGO: "Parcialmente pago",
};

export function useOrderDetailData(orderId: number) {
  const [orderDetail, setOrderDetail] = useState<OrderDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const getPaymentStateLabel = (paymentState: string) => {
    return paymentStateLabels[paymentState] ?? paymentState;
  };

  useEffect(() => {
    loadOrderDetail();
  }, [loadOrderDetail]);

  return {
    orderDetail,
    isLoading,
    getPaymentStateLabel,
    reloadOrderDetail: loadOrderDetail,
  };
}
