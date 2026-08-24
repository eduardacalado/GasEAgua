import { HelpHeaderButton } from "@components/help-header-button";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderCard } from "@components/order-card";
import { OrderList } from "@components/orders-list";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { Dropdown } from "react-native-element-dropdown";
import {
  getOrderStatusColor,
  getOrderStatusIconName,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
import { getOrdersFilterAppearance } from "src/helpers/orders-filter-appearance";
import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as S from "./styles";
import { useOrdersList } from "./use-orders-list";

type OrdersListNavigationProp = NativeStackNavigationProp<{
  orderDetail: { orderId: number };
  userCreateOrder: { type?: string };
}>;

export const OrdersListScreen = () => {
  const navigation = useNavigation<OrdersListNavigationProp>();
  const {
    openDatePicker,
    handleDateChange,
    refreshing,
    filteredSchedules,
    reloadScreenData,
    onEndList,
    selectStatusData,
    selectedStatus,
    date,
    toggleDatePicker,
    clearFilter,
    haveFilters,
    setSelectedStatus,
    isAdminView,
    updateOrderStatus,
    loadError,
  } = useOrdersList();

  const filterAppearance = getOrdersFilterAppearance({
    selectedStatus,
    date,
    hasActiveFilters: haveFilters,
  });

  function handleCreateOrder() {
    navigation.navigate("userCreateOrder", {});
  }

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
        <S.HelpButtonRow>
          <HelpHeaderButton />
        </S.HelpButtonRow>
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
              {date ? dayjs(date).format("DD/MM/YY") : "Data"}
            </S.ButtonText>
          </S.FilterButton>

          <S.ClearFilterButton
            onPress={clearFilter}
            disabled={!haveFilters}
            isEnabled={haveFilters}
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
          isLoadError={Boolean(loadError)}
          emptyArrayMessage={
            loadError
              ? "Não foi possível carregar os pedidos. Puxe a tela para tentar novamente."
              : isAdminView
                ? "Não há pedidos"
                : "Você ainda não possui pedidos"
          }
          refreshing={refreshing}
          orders={filteredSchedules}
          onRefresh={() => reloadScreenData()}
          renderItem={({ item }) => {
            const canUpdateOrderStatus =
              isAdminView &&
              item.status !== "FINALIZADO" &&
              item.status !== "CANCELADO";

            return (
              <OrderCard
                {...item}
                showUserName={isAdminView}
                username={item.user?.username}
                onPress={() =>
                  navigation.navigate("orderDetail", { orderId: item.id })
                }
                leftAction={
                  canUpdateOrderStatus
                    ? () => updateOrderStatus(item.id, "CANCELADO")
                    : undefined
                }
                rightAction={
                  canUpdateOrderStatus
                    ? () => updateOrderStatus(item.id, "FINALIZADO")
                    : undefined
                }
              />
            );
          }}
          itemSeparatorComponent={() => <S.Divider />}
          onEndList={onEndList}
        />
      </S.Container>
      {isAdminView && (
        <S.CreateOrderFab onPress={handleCreateOrder}>
          <Feather name="plus" size={24} color={theme.colors.WHITE} />
        </S.CreateOrderFab>
      )}
    </LinearGradientBackground>
  );
};
