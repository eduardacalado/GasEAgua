import { errorHandler } from "@utils/error-handler";
import { useEffect, useState } from "react";
import { getDeliveryDaySummary } from "src/services/delivery";
import { DeliveryDaySummary } from "src/services/delivery/types";

const initialSummaryData: DeliveryDaySummary = {
  totalOrdersToday: 0,
  pendingCount: 0,
  inProgressCount: 0,
  completedCount: 0,
};

export function useDeliveryHome() {
  const [summaryData, setSummaryData] =
    useState<DeliveryDaySummary>(initialSummaryData);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSummaryData() {
    setIsLoading(true);

    try {
      const deliverySummary = await getDeliveryDaySummary();
      setSummaryData(deliverySummary);
    } catch (error) {
      errorHandler(error, "Erro ao carregar o resumo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSummaryData();
  }, []);

  return {
    summaryData,
    isLoading,
    loadSummaryData,
  };
}
