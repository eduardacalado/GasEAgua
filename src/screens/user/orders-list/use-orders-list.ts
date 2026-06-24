import { useAppSelector } from "@hooks/useAppSelector";
import { useFocusEffect } from "@react-navigation/native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { ordersFilter } from "src/helpers/utils";
import { ORDER_STATUS_FILTER_OPTIONS } from "src/helpers/order-status";
import { concludeOrder, getOrders } from "src/services/order";
import { OrderProps, OrderStatusProps } from "src/types/orders";

export function useOrdersList() {
  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const isAdminView = role === "ADMIN";
  const ordersScope = isAdminView ? "all" : "me";

  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusProps>();
  const [haveMoreOperations, setHaveMoreOperations] = useState(true);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [date, setDate] = useState<Date>();
  const pageSize = 10;

  const onEndList = async () => {
    if (orders && orders.length > 0 && haveMoreOperations) {
      try {
        setRefreshing(true);
        const data = await getOrders({
          pageNumber: pageNumber,
          pageSize,
          scope: ordersScope,
        });
        if (orders) {
          setOrders((previewSchedules) => [...previewSchedules, ...data]);
          if (data.length === 0) setHaveMoreOperations(false);
        } else setOrders(data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ??
          error.message ??
          "tente novamente";
        setLoadError(errorMessage);
        Toast.show({
          type: "error",
          text2: `Erro ${errorMessage.toLowerCase()}`,
        });
      } finally {
        setRefreshing(false);
        setPageNumber((pageNumber) => pageNumber + 1);
      }
    }
  };

  const reloadScreenData = useCallback(async () => {
    setHaveMoreOperations(true);
    setRefreshing(true);

    try {
      const data = await getOrders({
        pageNumber: 0,
        pageSize,
        scope: ordersScope,
      });
      setOrders(data);
      setLoadError(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ??
        error.message ??
        "tente novamente";
      setLoadError(errorMessage);
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setRefreshing(false);
      setPageNumber(1);
      setHaveMoreOperations(true);
    }
  }, [ordersScope, pageSize]);

  const updateOrderStatus = async (
    orderId: number,
    status: OrderStatusProps
  ) => {
    try {
      await concludeOrder({ orderId, status });
      await reloadScreenData();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    }
  };

  const filteredSchedules = useMemo(() => {
    return ordersFilter({ orders, status: selectedStatus, date: date });
  }, [selectedStatus, orders, date]);

  const toggleDatePicker = () => {
    setOpenDatePicker(!openDatePicker);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setOpenDatePicker(false);
    setDate(currentDate);
  };

  const clearFilter = () => {
    setSelectedStatus(undefined);
    setDate(undefined);
  };

  const haveFilters = selectedStatus !== undefined || date !== undefined;

  const selectStatusData = ORDER_STATUS_FILTER_OPTIONS;

  useFocusEffect(
    useCallback(() => {
      reloadScreenData();
    }, [reloadScreenData])
  );

  return {
    openDatePicker,
    refreshing,
    filteredSchedules,
    selectStatusData,
    selectedStatus,
    date,
    haveFilters,
    handleDateChange,
    reloadScreenData,
    onEndList,
    toggleDatePicker,
    clearFilter,
    setSelectedStatus,
    loadError,
    isAdminView,
    updateOrderStatus,
  };
}
