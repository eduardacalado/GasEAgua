import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { updateOrderPaymentState } from "src/services/order";
import { registerPayment } from "src/services/transactions";
import { PaymentMethod } from "src/services/transactions/types";
import { OrderDetailProps, OrderPaymentStatus } from "src/types/orders";

type AdminPaymentStateOption = {
  label: string;
  value: OrderPaymentStatus;
};

type PartialPaymentFlowMode = "REGISTER_PAYMENT" | "REOPEN_BALANCE";

const PAYMENT_STATE_OPTIONS: AdminPaymentStateOption[] = [
  { label: "Pendente", value: "PENDENTE" },
  { label: "Parcialmente pago", value: "PARCIALMENTE_PAGO" },
  { label: "Pago", value: "PAGO" },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: "Dinheiro", value: "DINHEIRO" as PaymentMethod },
  { label: "PIX", value: "PIX" as PaymentMethod },
  { label: "Cartão", value: "CARTAO" as PaymentMethod },
  { label: "Transferência", value: "TRANSFERENCIA" as PaymentMethod },
];

function parsePaymentAmountInput(amountInput: string) {
  const normalizedAmount = amountInput.replace(",", ".").trim();
  return Number(normalizedAmount);
}

export function useAdminPaymentStateUpdate(
  orderId: number,
  orderDetail: OrderDetailProps | null,
  reloadOrderDetail: () => Promise<void>
) {
  const [isUpdatingPaymentState, setIsUpdatingPaymentState] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentAmountInput, setPaymentAmountInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentNotes, setPaymentNotes] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [partialPaymentFlowMode, setPartialPaymentFlowMode] =
    useState<PartialPaymentFlowMode>("REGISTER_PAYMENT");

  const openPartialPaymentModal = useCallback((flowMode: PartialPaymentFlowMode) => {
    if (!orderDetail) return;

    setPartialPaymentFlowMode(flowMode);
    setPaymentAmountInput("");
    if (flowMode === "REGISTER_PAYMENT") {
      setPaymentMethod("DINHEIRO");
    } else {
      setPaymentMethod(null);
    }
    setPaymentNotes("");
    setIsPaymentModalVisible(true);
  }, [orderDetail]);

  const closePartialPaymentModal = useCallback(() => {
    setIsPaymentModalVisible(false);
    setPaymentAmountInput("");
    setPaymentMethod(null);
    setPaymentNotes("");
  }, []);

  const updatePaymentState = useCallback(
    async (selectedState: OrderPaymentStatus) => {
      if (!orderDetail || orderDetail.payment_state === selectedState) return;

      if (selectedState === "PARCIALMENTE_PAGO") {
        const flowMode =
          orderDetail.payment_state === "PAGO"
            ? "REOPEN_BALANCE"
            : "REGISTER_PAYMENT";
        openPartialPaymentModal(flowMode);
        return;
      }

      setIsUpdatingPaymentState(true);

      try {
        await updateOrderPaymentState(orderId, selectedState);
        await reloadOrderDetail();
        Toast.show({
          type: "success",
          text2: "Status de pagamento atualizado",
        });
      } catch (error: any) {
        const errorMessage = error.response?.data?.message ?? "tente novamente";
        Toast.show({
          type: "error",
          text2: `Erro: ${errorMessage.toLowerCase()}`,
        });
      } finally {
        setIsUpdatingPaymentState(false);
      }
    },
    [orderId, orderDetail, reloadOrderDetail, openPartialPaymentModal]
  );

  const parsedPaymentAmount = parsePaymentAmountInput(paymentAmountInput);
  const hasPositiveAmount = parsedPaymentAmount > 0;
  const currentOrderTotal = orderDetail?.total ?? 0;
  const isRegisterPaymentFlow = partialPaymentFlowMode === "REGISTER_PAYMENT";
  const isReopenBalanceFlow = partialPaymentFlowMode === "REOPEN_BALANCE";

  const hasValidPartialPaymentAmountForRegisterFlow =
    hasPositiveAmount && parsedPaymentAmount <= currentOrderTotal;
  const hasValidPartialPaymentAmountForReopenFlow = hasPositiveAmount;

  let canSubmitPartialPayment = false;
  if (isRegisterPaymentFlow) {
    const hasPaymentMethod = Boolean(paymentMethod);
    canSubmitPartialPayment =
      hasPaymentMethod && hasValidPartialPaymentAmountForRegisterFlow;
  }
  if (isReopenBalanceFlow) {
    canSubmitPartialPayment = hasValidPartialPaymentAmountForReopenFlow;
  }

  const submitPartialPayment = useCallback(async () => {
    if (!canSubmitPartialPayment) {
      return;
    }

    const paymentAmount = parsePaymentAmountInput(paymentAmountInput);

    setIsSubmittingPayment(true);

    try {
      if (isReopenBalanceFlow) {
        await updateOrderPaymentState(orderId, "PARCIALMENTE_PAGO", {
          remainingBalance: paymentAmount,
          notes: paymentNotes.trim() || undefined,
        });
      }

      if (isRegisterPaymentFlow) {
        if (!paymentMethod) {
          return;
        }
        await registerPayment({
          order_id: orderId,
          amount_paid: paymentAmount,
          payment_method: paymentMethod,
          notes: paymentNotes.trim() || undefined,
        });
      }

      Toast.show({
        type: "success",
        text2: "Status de pagamento atualizado com sucesso",
      });

      await reloadOrderDetail();
      closePartialPaymentModal();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro: ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setIsSubmittingPayment(false);
    }
  }, [
    canSubmitPartialPayment,
    isRegisterPaymentFlow,
    isReopenBalanceFlow,
    orderId,
    paymentAmountInput,
    paymentMethod,
    paymentNotes,
    closePartialPaymentModal,
    reloadOrderDetail,
  ]);

  const paymentStateOptions = useMemo(() => PAYMENT_STATE_OPTIONS, []);
  const paymentMethodOptions = useMemo(() => PAYMENT_METHOD_OPTIONS, []);
  const partialPaymentModalTitle = isReopenBalanceFlow
    ? "Definir saldo restante"
    : "Registrar pagamento";
  const shouldShowPaymentMethodField = isRegisterPaymentFlow;

  return {
    isUpdatingPaymentState,
    paymentStateOptions,
    updatePaymentState,
    isPaymentModalVisible,
    closePartialPaymentModal,
    submitPartialPayment,
    isSubmittingPayment,
    canSubmitPartialPayment,
    partialPaymentModalTitle,
    shouldShowPaymentMethodField,
    paymentMethodOptions,
    paymentAmountInput,
    setPaymentAmountInput,
    paymentMethod,
    setPaymentMethod,
    paymentNotes,
    setPaymentNotes,
  };
}
