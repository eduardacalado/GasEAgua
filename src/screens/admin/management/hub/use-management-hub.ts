import { errorHandler } from "@utils/error-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getStockItems } from "src/services/management";
import { StockItem } from "src/services/management/types";

const LOW_STOCK_QUANTITY_THRESHOLD = 5;

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

  const hasLowStock = stockItems.some(
    (item) => item.quantity <= LOW_STOCK_QUANTITY_THRESHOLD
  );

  const lowStockItems = stockItems.filter(
    (item) => item.quantity <= LOW_STOCK_QUANTITY_THRESHOLD
  );

  return {
    hasLowStock,
    lowStockItems,
    isLoading,
    loadStockItems,
  };
}
