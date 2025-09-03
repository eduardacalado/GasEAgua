import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderCard } from "@components/order-card";
import { OrderList } from "@components/orders-list";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";
import * as S from "./styles";
import { useOrdersList } from "./use-orders-list";

export const OrdersListScreen = () => {
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
        <OrderList
          emptyArrayMessage="Você ainda não possui pedidos"
          refreshing={refreshing}
          orders={filteredSchedules}
          onRefresh={() => reloadScreenData()}
          renderItem={({ item }) => {
            return <OrderCard {...item} />;
          }}
          itemSeparatorComponent={() => <S.Divider />}
          onEndList={onEndList}
          listHeaderComponent={
            <S.FilterContainer>
              <S.HeaderSpacing />
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderColor: theme.colors.GRAY_200 },
                ]}
                placeholderStyle={[styles.placeholder]}
                selectedTextStyle={[
                  { color: theme.colors.GRAY_300 },
                  styles.placeholder,
                ]}
                iconStyle={styles.icon}
                itemTextStyle={styles.label}
                containerStyle={[
                  styles.container,
                  {
                    backgroundColor: theme.colors.GRAY_200,
                    borderColor: theme.colors.GRAY_100,
                  },
                ]}
                itemContainerStyle={{ borderRadius: 14 }}
                data={selectStatusData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={selectedStatus ?? "Status"}
                value={selectedStatus}
                onChange={({ value }: { value: OrderStatusProps }) => {
                  setSelectedStatus(value);
                }}
              />
              <S.FilterButton onPress={toggleDatePicker}>
                <S.ButtonText style={{ color: theme.colors.WHITE }}>
                  {date ? dayjs(dayjs().toDate()).format("DD/MM/YY") : "data"}
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
          }
        />
      </S.Container>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    flex: 1,
  },
  placeholder: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  label: { fontSize: 16, fontWeight: "bold" },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FFF",
  },
  container: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 14,
  },
});
