import { errorHandler } from "@utils/error-handler";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  getStockItems,
  updateStockItem,
  getAddons,
  updateAddon,
} from "src/services/management";
import { StockItem } from "src/services/management/types";
import { Addon } from "src/services/addon/types";

const LOW_STOCK_QUANTITY_THRESHOLD = 5;

type ModalTarget = {
  id: number;
  name: string;
  currentValue: number;
  kind: "stockQuantity" | "stockPrice" | "addonPrice";
};

function formatPriceInput(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function parsePriceInput(rawValue: string): number {
  const normalizedValue = rawValue.replace(/\s/g, "").replace("R$", "").trim();

  if (normalizedValue.includes(",") && normalizedValue.includes(".")) {
    const thousandsAsDot = normalizedValue.replace(/\./g, "").replace(",", ".");
    return Number(thousandsAsDot);
  }

  if (normalizedValue.includes(",")) {
    return Number(normalizedValue.replace(",", "."));
  }

  return Number(normalizedValue);
}

export function useStockAndPrices() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [addonItems, setAddonItems] = useState<Addon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null);
  const [modalInputValue, setModalInputValue] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [stockData, addonsData] = await Promise.all([
        getStockItems(),
        getAddons(),
      ]);
      setStockItems(stockData);
      setAddonItems(addonsData);
    } catch (error) {
      errorHandler(error, "Erro ao carregar dados.");
    }
  }, []);

  const initialLoad = useCallback(async () => {
    setIsLoading(true);
    await loadData();
    setIsLoading(false);
  }, [loadData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const openSetQuantityModal = (item: StockItem) => {
    setModalTarget({
      id: item.id,
      name: item.name,
      currentValue: item.quantity,
      kind: "stockQuantity",
    });
    setModalInputValue(String(item.quantity));
  };

  const openStockPriceModal = (item: StockItem) => {
    setModalTarget({
      id: item.id,
      name: item.name,
      currentValue: item.value,
      kind: "stockPrice",
    });
    setModalInputValue(formatPriceInput(item.value));
  };

  const openAddonPriceModal = (addon: Addon) => {
    setModalTarget({
      id: addon.id,
      name: addon.name,
      currentValue: addon.value,
      kind: "addonPrice",
    });
    setModalInputValue(formatPriceInput(addon.value));
  };

  const closeModal = () => {
    setModalTarget(null);
    setModalInputValue("");
  };

  const handleSubmitModal = async () => {
    if (!modalTarget) return;

    const isStockQuantityModal = modalTarget.kind === "stockQuantity";
    const parsedInputValue = isStockQuantityModal
      ? Number(modalInputValue)
      : parsePriceInput(modalInputValue);

    const isInvalidStockQuantity =
      isStockQuantityModal &&
      (!Number.isFinite(parsedInputValue) ||
        parsedInputValue < 0 ||
        !Number.isInteger(parsedInputValue));
    const isInvalidPrice = !isStockQuantityModal && parsedInputValue <= 0;

    if (isInvalidStockQuantity) {
      Toast.show({
        type: "error",
        text1: "Quantidade inválida",
        text2: "Informe um número inteiro maior ou igual a zero.",
      });
      return;
    }

    if (!Number.isFinite(parsedInputValue) || isInvalidPrice) {
      Toast.show({
        type: "error",
        text1: "Valor inválido",
        text2: "Informe um número maior que zero.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (modalTarget.kind === "stockQuantity") {
        await updateStockItem(modalTarget.id, { quantity: parsedInputValue });
        Toast.show({
          type: "success",
          text1: `Quantidade de ${modalTarget.name} atualizada`,
        });
      } else if (modalTarget.kind === "stockPrice") {
        await updateStockItem(modalTarget.id, { value: parsedInputValue });
        Toast.show({ type: "success", text1: `Preço de ${modalTarget.name} atualizado` });
      } else if (modalTarget.kind === "addonPrice") {
        await updateAddon(modalTarget.id, { value: parsedInputValue });
        Toast.show({ type: "success", text1: `Preço de ${modalTarget.name} atualizado` });
      }

      closeModal();
      await loadData();
    } catch (error) {
      errorHandler(error, "Erro ao salvar alteração.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLowStock = (quantity: number) =>
    quantity <= LOW_STOCK_QUANTITY_THRESHOLD;

  return {
    stockItems,
    addonItems,
    isLoading,
    refreshing,
    handleRefresh,
    modalTarget,
    modalInputValue,
    setModalInputValue,
    isSubmitting,
    openSetQuantityModal,
    openStockPriceModal,
    openAddonPriceModal,
    closeModal,
    handleSubmitModal,
    isLowStock,
  };
}
