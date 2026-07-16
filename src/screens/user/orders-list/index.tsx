import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderCard } from "@components/order-card";
import { OrderList } from "@components/orders-list";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  getOrderStatusColor,
  getOrderStatusIconName,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as S from "./styles";
import { useOrdersList } from "./use-orders-list";

type OrderDetailNavigationProp = NativeStackNavigationProp<{
  orderDetail: { orderId: number };
}>;

export const OrdersListScreen = () => {
  const navigation = useNavigation<OrderDetailNavigationProp>();
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

  const hasSelectedStatus = Boolean(selectedStatus);
  const hasSelectedDate = Boolean(date);
  const statusFilterColor = selectedStatus
    ? getOrderStatusColor(selectedStatus)
    : theme.colors.GRAY_300;
  const statusFilterSurface = selectedStatus
    ? getOrderStatusSurfaceColor(selectedStatus)
    : theme.colors.GRAY_100;
  const dateFilterColor = hasSelectedDate
    ? theme.colors.ORANGE_200
    : theme.colors.GRAY_300;
  const dateFilterSurface = hasSelectedDate
    ? theme.colors.ORANGE_50
    : theme.colors.GRAY_100;
  const clearFilterBackgroundColor = haveFilters
    ? theme.colors.RED_100
    : "#C5C5C5";
  const clearFilterIconColor = haveFilters
    ? theme.colors.WHITE
    : "#F2F2F2";

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
            backgroundColor={
              hasSelectedStatus ? statusFilterSurface : theme.colors.WHITE
            }
            isActive={hasSelectedStatus}
          >
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={[
                styles.selectedText,
                {
                  color: hasSelectedStatus
                    ? statusFilterColor
                    : theme.colors.GRAY_600,
                },
              ]}
              iconStyle={[
                styles.icon,
                {
                  tintColor: hasSelectedStatus
                    ? statusFilterColor
                    : theme.colors.GRAY_300,
                },
              ]}
              containerStyle={styles.menuContainer}
              itemContainerStyle={styles.menuItemContainer}
              activeColor={theme.colors.GRAY_100}
              data={selectStatusData}
              maxHeight={220}
              labelField="label"
              valueField="value"
              placeholder="Status"
              value={selectedStatus}
              renderLeftIcon={() => (
                <S.FilterIconBadge backgroundColor={statusFilterSurface}>
                  <Feather
                    name={
                      selectedStatus
                        ? getOrderStatusIconName(selectedStatus)
                        : "filter"
                    }
                    size={14}
                    color={statusFilterColor}
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
            backgroundColor={
              hasSelectedDate ? dateFilterSurface : theme.colors.WHITE
            }
            isActive={hasSelectedDate}
          >
            <S.FilterIconBadge backgroundColor={dateFilterSurface}>
              <Feather name="calendar" size={14} color={dateFilterColor} />
            </S.FilterIconBadge>
            <S.ButtonText
              color={
                hasSelectedDate
                  ? theme.colors.ORANGE_200
                  : theme.colors.GRAY_600
              }
              numberOfLines={1}
            >
              {date ? dayjs(date).format("DD/MM/YY") : "Filtrar por data"}
            </S.ButtonText>
          </S.FilterButton>

          <S.ClearFilterButton
            onPress={clearFilter}
            disabled={!haveFilters}
            isEnabled={haveFilters}
            backgroundColor={clearFilterBackgroundColor}
            activeOpacity={0.8}
          >
            <Feather name="trash-2" size={22} color={clearFilterIconColor} />
          </S.ClearFilterButton>
        </S.FilterContainer>
        <OrderList
          emptyArrayMessage={
            loadError
              ? "Não foi possível carregar os pedidos. Verifique se o servidor está rodando e puxe para atualizar."
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
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    paddingLeft: 4,
  },
  placeholder: {
    fontSize: 13,
    color: theme.colors.GRAY_300,
    fontWeight: "700",
  },
  selectedText: {
    fontSize: 13,
    fontWeight: "700",
  },
  icon: {
    width: 18,
    height: 18,
  },
  menuContainer: {
    borderRadius: 12,
    backgroundColor: theme.colors.WHITE,
    marginTop: 6,
    paddingVertical: 4,
    minWidth: 200,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItemContainer: {
    paddingHorizontal: 0,
  },
});
