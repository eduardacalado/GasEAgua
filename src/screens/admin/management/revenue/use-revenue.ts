import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { errorHandler } from "@utils/error-handler";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { getRevenueMetrics } from "src/services/management";
import { RevenueMetrics } from "src/services/management/types";

type ViewMode = "today" | "range";

const initialMetrics: RevenueMetrics = {
  startDate: "",
  endDate: "",
  ordersCount: 0,
  paidRevenue: 0,
  pendingRevenue: 0,
  itemsByType: {},
};

export function useRevenue() {
  const [viewMode, setViewMode] = useState<ViewMode>("today");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [metrics, setMetrics] = useState<RevenueMetrics>(initialMetrics);
  const [isLoading, setIsLoading] = useState(true);

  const loadMetrics = useCallback(async () => {
    setIsLoading(true);
    try {
      const formattedStart = dayjs(startDate).format("YYYY-MM-DD");
      const isRangeMode = viewMode === "range";
      const formattedEnd = isRangeMode
        ? dayjs(endDate).format("YYYY-MM-DD")
        : undefined;

      const revenueData = await getRevenueMetrics(formattedStart, formattedEnd);
      setMetrics(revenueData);
    } catch (error) {
      errorHandler(error, "Erro ao carregar faturamento.");
    } finally {
      setIsLoading(false);
    }
  }, [viewMode, startDate, endDate]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  const switchToToday = () => {
    setViewMode("today");
    setStartDate(new Date());
  };

  const switchToRange = () => {
    setViewMode("range");
  };

  const handleStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setOpenStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setOpenEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const toggleStartPicker = () => setOpenStartPicker(!openStartPicker);
  const toggleEndPicker = () => setOpenEndPicker(!openEndPicker);

  return {
    viewMode,
    startDate,
    endDate,
    openStartPicker,
    openEndPicker,
    metrics,
    isLoading,
    switchToToday,
    switchToRange,
    handleStartDateChange,
    handleEndDateChange,
    toggleStartPicker,
    toggleEndPicker,
    loadMetrics,
  };
}
