import { useFocusEffect } from "@react-navigation/native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { ordersFilter } from "src/helpers/utils";
import { ORDER_STATUS_FILTER_OPTIONS } from "src/helpers/order-status";
import {
  getDeliveryOrders,
  updateDeliveryOrderStatus,
} from "src/services/delivery";
import { OrderProps, OrderStatusProps } from "src/types/orders";

const PAGE_SIZE = 10;

export function useDeliveryOrdersList() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusProps>();
  const [hasMoreOrders, setHasMoreOrders] = useState(true);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [date, setDate] = useState<Date>();

  const loadNextPage = async () => {
    if (!orders.length || !hasMoreOrders) {
      return;
    }

    try {
      setRefreshing(true);
      const nextPageOrders = await getDeliveryOrders({
        pageNumber,
        pageSize: PAGE_SIZE,
      });

      if (nextPageOrders.length === 0) {
        setHasMoreOrders(false);
      } else {
        setOrders((previousOrders) => [...previousOrders, ...nextPageOrders]);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      setLoadError(errorMessage);
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setRefreshing(false);
      setPageNumber((currentPage) => currentPage + 1);
    }
  };

  const reloadOrders = useCallback(async () => {
    setHasMoreOrders(true);
    setRefreshing(true);

    try {
      const firstPageOrders = await getDeliveryOrders({
        pageNumber: 0,
        pageSize: PAGE_SIZE,
      });
      setOrders(firstPageOrders);
      setLoadError(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      setLoadError(errorMessage);
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setRefreshing(false);
      setPageNumber(1);
      setHasMoreOrders(true);
    }
  }, []);

  const updateOrderStatus = async (
    orderId: number,
    status: OrderStatusProps
  ) => {
    try {
      await updateDeliveryOrderStatus(orderId, status);
      await reloadOrders();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    }
  };

  const filteredOrders = useMemo(() => {
    return ordersFilter({ orders, status: selectedStatus, date });
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

  const hasActiveFilters = selectedStatus !== undefined || date !== undefined;

  useFocusEffect(
    useCallback(() => {
      reloadOrders();
    }, [reloadOrders])
  );

  return {
    openDatePicker,
    refreshing,
    filteredOrders,
    selectStatusData: ORDER_STATUS_FILTER_OPTIONS,
    selectedStatus,
    date,
    hasActiveFilters,
    handleDateChange,
    reloadOrders,
    loadNextPage,
    toggleDatePicker,
    clearFilter,
    setSelectedStatus,
    loadError,
    updateOrderStatus,
  };
}
