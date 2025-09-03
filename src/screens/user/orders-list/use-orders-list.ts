import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { ordersFilter } from "src/helpers/utils";
import { getOrders } from "src/services/order";
import { OrderProps, OrderStatusProps } from "src/types/orders";

export function useOrdersList() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
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
        const data = await getOrders({ pageNumber: pageNumber, pageSize });
        if (orders) {
          setOrders((previewSchedules) => [...previewSchedules, ...data]);
          if (data.length === 0) setHaveMoreOperations(false);
        } else setOrders(data);
      } catch (error: any) {
        const errorMessage = error.response.data.message ?? "tente novamente";
        Toast.show({
          type: "danger",
          text2: `Erro ${errorMessage.toLowerCase()}`,
        });
      } finally {
        setRefreshing(false);
        setPageNumber((pageNumber) => pageNumber + 1);
      }
    }
  };

  const reloadScreenData = async () => {
    setHaveMoreOperations(true);
    setRefreshing(true);

    try {
      const data = await getOrders({ pageNumber: 0, pageSize });
      setOrders(data);
    } catch (error: any) {
      const errorMessage = error.response.data.message ?? "tente novamente";
      Toast.show({
        type: "danger",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setRefreshing(false);
      setPageNumber(1);
      setHaveMoreOperations(true);
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

  const selectStatusData: { label: string; value: OrderStatusProps }[] = [
    { label: "Finalizado", value: "FINALIZADO" },
    { label: "Pendente", value: "PENDENTE" },
    { label: "Iniciado", value: "INICIADO" },
  ];

  useEffect(() => {
    reloadScreenData();
  }, []);

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
  };
}
