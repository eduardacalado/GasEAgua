import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderCard } from "@components/order-card";
import { OrderList } from "@components/orders-list";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Dropdown } from "react-native-element-dropdown";
import { getOrdersFilterAppearance } from "src/helpers/orders-filter-appearance";
import {
  getOrderStatusColor,
  getOrderStatusIconName,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as S from "./styles";
import { useDeliveryOrdersList } from "./use-delivery-orders-list";

type DeliveryOrderDetailNavigationProp = NativeStackNavigationProp<{
  orderDetail: { orderId: number };
}>;

function getNextDeliveryStatus(
  currentStatus: OrderStatusProps
): OrderStatusProps | null {
  if (currentStatus === "PENDENTE") return "INICIADO";
  if (currentStatus === "INICIADO") return "FINALIZADO";
  return null;
}

export function DeliveryOrdersListScreen() {
  const navigation = useNavigation<DeliveryOrderDetailNavigationProp>();
  const {
    openDatePicker,
    handleDateChange,
    refreshing,
    filteredOrders,
    reloadOrders,
    loadNextPage,
    selectStatusData,
    selectedStatus,
    date,
    toggleDatePicker,
    clearFilter,
    hasActiveFilters,
    setSelectedStatus,
    updateOrderStatus,
    loadError,
  } = useDeliveryOrdersList();

  const filterAppearance = getOrdersFilterAppearance({
    selectedStatus,
    date,
    hasActiveFilters,
  });

  return (
    <LinearGradientBackground>
      {openDatePicker && (
        <DateTimePicker
          value={date ?? dayjs().toDate()}
          mode="date"
          locale="pt-BR"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <S.Container>
        <S.FilterContainer>
          <S.FilterControlShell
            backgroundColor={filterAppearance.statusShellBackgroundColor}
            isActive={filterAppearance.hasSelectedStatus}
          >
            <Dropdown
              style={S.dropdownStyle}
              placeholderStyle={S.dropdownPlaceholderStyle}
              selectedTextStyle={[
                S.dropdownSelectedTextStyle,
                { color: filterAppearance.selectedTextColor },
              ]}
              iconStyle={[
                S.dropdownIconStyle,
                { tintColor: filterAppearance.iconTintColor },
              ]}
              containerStyle={S.dropdownMenuContainerStyle}
              itemContainerStyle={S.dropdownMenuItemContainerStyle}
              activeColor={theme.colors.GRAY_100}
              data={selectStatusData}
              maxHeight={220}
              labelField="label"
              valueField="value"
              placeholder="Status"
              value={selectedStatus}
              renderLeftIcon={() => (
                <S.FilterIconBadge
                  backgroundColor={filterAppearance.statusFilterSurface}
                >
                  <Feather
                    name={
                      selectedStatus
                        ? getOrderStatusIconName(selectedStatus)
                        : "filter"
                    }
                    size={14}
                    color={filterAppearance.statusFilterColor}
                  />
                </S.FilterIconBadge>
              )}
              renderItem={(item, selected) => {
                const statusColor = getOrderStatusColor(item.value);
                const statusSurface = getOrderStatusSurfaceColor(item.value);

                return (
                  <S.StatusFilterOption>
                    <S.StatusFilterIconBadge backgroundColor={statusSurface}>
                      <Feather
                        name={getOrderStatusIconName(item.value)}
                        size={14}
                        color={statusColor}
                      />
                    </S.StatusFilterIconBadge>
                    <S.StatusFilterLabel
                      color={selected ? statusColor : theme.colors.GRAY_600}
                      numberOfLines={1}
                    >
                      {item.label}
                    </S.StatusFilterLabel>
                  </S.StatusFilterOption>
                );
              }}
              onChange={({ value }: { value: OrderStatusProps }) => {
                setSelectedStatus(value);
              }}
            />
          </S.FilterControlShell>

          <S.FilterButton
            onPress={toggleDatePicker}
            backgroundColor={filterAppearance.dateButtonBackgroundColor}
            isActive={filterAppearance.hasSelectedDate}
          >
            <S.FilterIconBadge
              backgroundColor={filterAppearance.dateFilterSurface}
            >
              <Feather
                name="calendar"
                size={14}
                color={filterAppearance.dateFilterColor}
              />
            </S.FilterIconBadge>
            <S.ButtonText
              color={filterAppearance.dateButtonTextColor}
              numberOfLines={1}
            >
              {date ? dayjs(date).format("DD/MM/YY") : "Filtrar por data"}
            </S.ButtonText>
          </S.FilterButton>

          <S.ClearFilterButton
            onPress={clearFilter}
            disabled={!hasActiveFilters}
            isEnabled={hasActiveFilters}
            backgroundColor={filterAppearance.clearFilterBackgroundColor}
            activeOpacity={0.8}
          >
            <Feather
              name="trash-2"
              size={22}
              color={filterAppearance.clearFilterIconColor}
            />
          </S.ClearFilterButton>
        </S.FilterContainer>
        <OrderList
          emptyArrayMessage={
            loadError
              ? "Não foi possível carregar os pedidos. Verifique se o servidor está rodando e puxe para atualizar."
              : "Não há pedidos"
          }
          refreshing={refreshing}
          orders={filteredOrders}
          onRefresh={() => reloadOrders()}
          renderItem={({ item }) => {
            const nextStatus = getNextDeliveryStatus(item.status);

            return (
              <OrderCard
                {...item}
                showUserName
                username={item.user?.username}
                onPress={() =>
                  navigation.navigate("orderDetail", { orderId: item.id })
                }
                rightAction={
                  nextStatus
                    ? () => updateOrderStatus(item.id, nextStatus)
                    : undefined
                }
              />
            );
          }}
          itemSeparatorComponent={() => <S.Divider />}
          onEndList={loadNextPage}
        />
      </S.Container>
    </LinearGradientBackground>
  );
}
