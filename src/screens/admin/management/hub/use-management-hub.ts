import { errorHandler } from "@utils/error-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { hasStockQuantityAlert } from "src/helpers/stock-quantity";
import { getStockItems } from "src/services/management";
import { StockItem } from "src/services/management/types";

export function useManagementHub() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStockItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const items = await getStockItems();
      setStockItems(items);
    } catch (error) {
      errorHandler(error, "Erro ao carregar estoque.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStockItems();
    }, [loadStockItems])
  );

  const stockAlertItems = stockItems.filter((item) =>
    hasStockQuantityAlert(item.quantity)
  );
  const hasStockAlert = stockAlertItems.length > 0;

  return {
    hasStockAlert,
    stockAlertItems,
    isLoading,
    loadStockItems,
  };
}
