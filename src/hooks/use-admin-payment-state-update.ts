import { useCallback, useState } from "react";
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
  { label: "Pendente", value: OrderPaymentStatus.PENDENTE },
  { label: "Parcialmente pago", value: OrderPaymentStatus.PARCIALMENTE_PAGO },
  { label: "Pago", value: OrderPaymentStatus.PAGO },
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

function getPartialPaymentFlowMode(
  currentPaymentState: OrderPaymentStatus
): PartialPaymentFlowMode {
  if (currentPaymentState === OrderPaymentStatus.PAGO) {
    return "REOPEN_BALANCE";
  }

  return "REGISTER_PAYMENT";
}

function getInitialPaymentMethod(
  flowMode: PartialPaymentFlowMode
): PaymentMethod | null {
  if (flowMode === "REGISTER_PAYMENT") {
    return "DINHEIRO";
  }

  return null;
}

function getPartialPaymentModalTitle(flowMode: PartialPaymentFlowMode) {
  if (flowMode === "REOPEN_BALANCE") {
    return "Definir saldo restante";
  }

  return "Registrar pagamento";
}

function canSubmitRegisterPayment(params: {
  paymentAmount: number;
  currentOrderTotal: number;
  paymentMethod: PaymentMethod | null;
}) {
  const hasPaymentMethod = Boolean(params.paymentMethod);
  const hasPositiveAmount = params.paymentAmount > 0;
  const hasAmountWithinOrderTotal =
    params.paymentAmount <= params.currentOrderTotal;

  return hasPaymentMethod && hasPositiveAmount && hasAmountWithinOrderTotal;
}

function canSubmitReopenBalance(paymentAmount: number) {
  return paymentAmount > 0;
}

function canSubmitPartialPayment(params: {
  flowMode: PartialPaymentFlowMode;
  paymentAmount: number;
  currentOrderTotal: number;
  paymentMethod: PaymentMethod | null;
}) {
  if (params.flowMode === "REGISTER_PAYMENT") {
    return canSubmitRegisterPayment(params);
  }

  return canSubmitReopenBalance(params.paymentAmount);
}

function getToastErrorMessage(error: any) {
  const errorMessage =
    error.response?.data?.message ?? error.message ?? "tente novamente";

  return `Erro: ${errorMessage.toLowerCase()}`;
}

async function reopenOrderBalance(params: {
  orderId: number;
  remainingBalance: number;
  notes: string;
}) {
  const trimmedNotes = params.notes.trim();
  let notes: string | undefined;

  if (trimmedNotes) {
    notes = trimmedNotes;
  }

  await updateOrderPaymentState(
    params.orderId,
    OrderPaymentStatus.PARCIALMENTE_PAGO,
    {
      remainingBalance: params.remainingBalance,
      notes,
    }
  );
}

async function registerOrderPayment(params: {
  orderId: number;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  notes: string;
}) {
  const trimmedNotes = params.notes.trim();
  let notes: string | undefined;

  if (trimmedNotes) {
    notes = trimmedNotes;
  }

  await registerPayment({
    order_id: params.orderId,
    amount_paid: params.amountPaid,
    payment_method: params.paymentMethod,
    notes,
  });
}

export function useAdminPaymentStateUpdate(
  orderId: number,
  orderDetail: OrderDetailProps | null,
  reloadOrderDetail: () => Promise<void>
) {
  const [isUpdatingPaymentState, setIsUpdatingPaymentState] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [paymentAmountInput, setPaymentAmountInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [paymentNotes, setPaymentNotes] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [partialPaymentFlowMode, setPartialPaymentFlowMode] =
    useState<PartialPaymentFlowMode>("REGISTER_PAYMENT");

  const openPartialPaymentModal = useCallback(
    (flowMode: PartialPaymentFlowMode) => {
      if (!orderDetail) {
        return;
      }

      setPartialPaymentFlowMode(flowMode);
      setPaymentAmountInput("");
      setPaymentMethod(getInitialPaymentMethod(flowMode));
      setPaymentNotes("");
      setIsPaymentModalVisible(true);
    },
    [orderDetail]
  );

  const closePartialPaymentModal = useCallback(() => {
    setIsPaymentModalVisible(false);
    setPaymentAmountInput("");
    setPaymentMethod(null);
    setPaymentNotes("");
  }, []);

  const updatePaymentState = useCallback(
    async (selectedState: OrderPaymentStatus) => {
      if (!orderDetail || orderDetail.payment_state === selectedState) {
        return;
      }

      if (selectedState === OrderPaymentStatus.PARCIALMENTE_PAGO) {
        const flowMode = getPartialPaymentFlowMode(orderDetail.payment_state);
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
        Toast.show({
          type: "error",
          text2: getToastErrorMessage(error),
        });
      } finally {
        setIsUpdatingPaymentState(false);
      }
    },
    [orderId, orderDetail, reloadOrderDetail, openPartialPaymentModal]
  );

  const parsedPaymentAmount = parsePaymentAmountInput(paymentAmountInput);
  const currentOrderTotal = orderDetail?.total ?? 0;
  const isRegisterPaymentFlow = partialPaymentFlowMode === "REGISTER_PAYMENT";
  const isReopenBalanceFlow = partialPaymentFlowMode === "REOPEN_BALANCE";
  const canSubmitCurrentPartialPayment = canSubmitPartialPayment({
    flowMode: partialPaymentFlowMode,
    paymentAmount: parsedPaymentAmount,
    currentOrderTotal,
    paymentMethod,
  });
  const partialPaymentModalTitle = getPartialPaymentModalTitle(
    partialPaymentFlowMode
  );

  const submitPartialPayment = useCallback(async () => {
    if (!canSubmitCurrentPartialPayment) {
      return;
    }

    const paymentAmount = parsePaymentAmountInput(paymentAmountInput);

    setIsSubmittingPayment(true);

    try {
      if (isReopenBalanceFlow) {
        await reopenOrderBalance({
          orderId,
          remainingBalance: paymentAmount,
          notes: paymentNotes,
        });
      }

      if (isRegisterPaymentFlow) {
        if (!paymentMethod) {
          return;
        }

        await registerOrderPayment({
          orderId,
          amountPaid: paymentAmount,
          paymentMethod,
          notes: paymentNotes,
        });
      }

      Toast.show({
        type: "success",
        text2: "Status de pagamento atualizado com sucesso",
      });

      await reloadOrderDetail();
      closePartialPaymentModal();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text2: getToastErrorMessage(error),
      });
    } finally {
      setIsSubmittingPayment(false);
    }
  }, [
    canSubmitCurrentPartialPayment,
    isRegisterPaymentFlow,
    isReopenBalanceFlow,
    orderId,
    paymentAmountInput,
    paymentMethod,
    paymentNotes,
    closePartialPaymentModal,
    reloadOrderDetail,
  ]);

  return {
    isUpdatingPaymentState,
    paymentStateOptions: PAYMENT_STATE_OPTIONS,
    updatePaymentState,
    isPaymentModalVisible,
    closePartialPaymentModal,
    submitPartialPayment,
    isSubmittingPayment,
    canSubmitPartialPayment: canSubmitCurrentPartialPayment,
    partialPaymentModalTitle,
    shouldShowPaymentMethodField: isRegisterPaymentFlow,
    paymentMethodOptions: PAYMENT_METHOD_OPTIONS,
    paymentAmountInput,
    setPaymentAmountInput,
    paymentMethod,
    setPaymentMethod,
    paymentNotes,
    setPaymentNotes,
  };
}
