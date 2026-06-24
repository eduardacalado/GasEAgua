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
import { getOrderStatusColor } from "src/helpers/order-status";
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
          <S.FilterControlShell>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={[
                  styles.selectedText,
                  {
                    color: selectedStatus
                      ? getOrderStatusColor(selectedStatus)
                      : theme.colors.GRAY_600,
                  },
                ]}
                iconStyle={[
                  styles.icon,
                  {
                    tintColor: selectedStatus
                      ? getOrderStatusColor(selectedStatus)
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
                renderItem={(item, selected) => {
                  const statusColor = getOrderStatusColor(item.value);

                  return (
                    <S.StatusFilterOption>
                      <S.StatusFilterDot color={statusColor} />
                      <S.StatusFilterLabel
                        color={
                          selected ? statusColor : theme.colors.GRAY_600
                        }
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
            <S.FilterButton onPress={toggleDatePicker}>
              <S.ButtonText>
                {date ? dayjs(date).format("DD/MM/YY") : "Filtrar por data"}
              </S.ButtonText>
            </S.FilterButton>
            <S.ClearFilterButton
              onPress={clearFilter}
              color={
                haveFilters ? theme.colors.RED_100 : theme.colors.GRAY_200
              }
            >
              <Feather
                name="trash-2"
                size={26}
                color={
                  haveFilters ? theme.colors.WHITE : theme.colors.GRAY_400
                }
              />
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
  },
  placeholder: {
    fontSize: 16,
    color: theme.colors.GRAY_300,
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 20,
    height: 20,
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
