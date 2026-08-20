import { errorHandler } from "@utils/error-handler";
import { useCallback, useEffect, useState } from "react";
import { getPaymentSettings } from "src/services/management";
import { PaymentSettings } from "src/services/management/types";

export function usePaymentSettings() {
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadPaymentSettings = useCallback(async () => {
    setIsLoading(true);

    try {
      const settings = await getPaymentSettings();
      setPaymentSettings(settings);
    } catch (error) {
      errorHandler(error, "Erro ao carregar dados de pagamento Pix.");
      setPaymentSettings(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPaymentSettings();
  }, [loadPaymentSettings]);

  return {
    paymentSettings,
    isLoading,
    reloadPaymentSettings: loadPaymentSettings,
  };
}
