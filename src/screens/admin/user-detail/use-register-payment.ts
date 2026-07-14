import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { registerPayment } from "src/services/transactions";
import { PaymentMethod } from "src/services/transactions/types";
import { formatToBRL } from "src/helpers/format-currency";
import { isOpenAccount } from "src/helpers/payment-state";
import { UserAccountProps } from "src/services/user/types";

function parsePaymentAmountInput(amountInput: string) {
  const normalizedAmount = amountInput.replace(",", ".").trim();
  return Number(normalizedAmount);
}

type UseRegisterPaymentParams = {
  userAccounts: UserAccountProps[];
  onPaymentSuccess: () => Promise<void>;
};

export function useRegisterPayment({
  userAccounts,
  onPaymentSuccess,
}: UseRegisterPaymentParams) {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentAccountId, setSelectedPaymentAccountId] = useState<
    number | null
  >(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [paymentNotes, setPaymentNotes] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  const openAccounts = useMemo(
    () => userAccounts.filter((account) => isOpenAccount(account.payment_state)),
    [userAccounts]
  );

  const paymentAccountOptions = useMemo(
    () =>
      openAccounts.map((account) => ({
        label: `Conta #${account.id} — saldo ${formatToBRL(account.total)}`,
        value: account.id,
        balance: account.total,
      })),
    [openAccounts]
  );

  const paymentMethodOptions = useMemo(
    () => [
      { label: "Dinheiro", value: "DINHEIRO" as PaymentMethod },
      { label: "PIX", value: "PIX" as PaymentMethod },
      { label: "Cartão", value: "CARTAO" as PaymentMethod },
      { label: "Transferência", value: "TRANSFERENCIA" as PaymentMethod },
    ],
    []
  );

  const selectedPaymentAccount = openAccounts.find(
    (account) => account.id === selectedPaymentAccountId
  );

  const resetPaymentForm = useCallback(() => {
    setSelectedPaymentAccountId(null);
    setPaymentAmountInput("");
    setPaymentMethod(null);
    setPaymentNotes("");
  }, []);

  const openPaymentModal = useCallback(() => {
    const firstOpenAccount = openAccounts[0];

    if (!firstOpenAccount) {
      Toast.show({
        type: "error",
        text2: "Não há contas em aberto para registrar pagamento",
      });
      return;
    }

    setSelectedPaymentAccountId(firstOpenAccount.id);
    setPaymentAmountInput(String(firstOpenAccount.total));
    setPaymentMethod("DINHEIRO");
    setPaymentNotes("");
    setIsPaymentModalVisible(true);
  }, [openAccounts]);

  const closePaymentModal = useCallback(() => {
    setIsPaymentModalVisible(false);
    resetPaymentForm();
  }, [resetPaymentForm]);

  const handlePaymentAccountChange = useCallback(
    (accountId: number) => {
      const selectedAccount = openAccounts.find(
        (account) => account.id === accountId
      );

      setSelectedPaymentAccountId(accountId);

      if (selectedAccount) {
        setPaymentAmountInput(String(selectedAccount.total));
      }
    },
    [openAccounts]
  );

  const submitPayment = useCallback(async () => {
    if (!selectedPaymentAccountId || !paymentMethod) {
      Toast.show({
        type: "error",
        text2: "Selecione a conta e o método de pagamento",
      });
      return;
    }

    const paymentAmount = parsePaymentAmountInput(paymentAmountInput);

    if (!paymentAmount || paymentAmount <= 0) {
      Toast.show({
        type: "error",
        text2: "Informe um valor válido para o pagamento",
      });
      return;
    }

    if (
      selectedPaymentAccount &&
      paymentAmount > selectedPaymentAccount.total
    ) {
      Toast.show({
        type: "error",
        text2: "O valor não pode ser maior que o saldo da conta",
      });
      return;
    }

    setIsSubmittingPayment(true);

    try {
      await registerPayment({
        order_id: selectedPaymentAccountId,
        amount_paid: paymentAmount,
        payment_method: paymentMethod,
        notes: paymentNotes.trim() || undefined,
      });

      Toast.show({
        type: "success",
        text2: "Pagamento registrado com sucesso",
      });

      closePaymentModal();
      await onPaymentSuccess();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setIsSubmittingPayment(false);
    }
  }, [
    closePaymentModal,
    onPaymentSuccess,
    paymentAmountInput,
    paymentMethod,
    paymentNotes,
    selectedPaymentAccount,
    selectedPaymentAccountId,
  ]);

  return {
    isPaymentModalVisible,
    openPaymentModal,
    closePaymentModal,
    submitPayment,
    isSubmittingPayment,
    hasOpenAccounts: openAccounts.length > 0,
    paymentAccountOptions,
    paymentMethodOptions,
    selectedPaymentAccountId,
    handlePaymentAccountChange,
    paymentAmountInput,
    setPaymentAmountInput,
    paymentMethod,
    setPaymentMethod,
    paymentNotes,
    setPaymentNotes,
  };
}
