import { Dropdown } from "react-native-element-dropdown";
import {
  getOrderStatusColor,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
import theme from "src/styles/theme";
import { OrderDetailProps, OrderStatusProps } from "src/types/orders";
import * as S from "../styles";

type OrderStatusOption = {
  label: string;
  value: OrderStatusProps;
};

type StatusSelectProps = {
  value: OrderStatusProps;
  options: OrderStatusOption[];
  disabled?: boolean;
  onChange: (status: OrderStatusProps) => void;
};

function StatusSelect({
  value,
  options,
  disabled,
  onChange,
}: StatusSelectProps) {
  const selectedStatusColor = getOrderStatusColor(value);
  const selectedStatusSurface = getOrderStatusSurfaceColor(value);

  return (
    <S.StatusDropdown
      borderColor={selectedStatusColor}
      backgroundColor={selectedStatusSurface}
    >
      <Dropdown
        style={S.statusDropdownStyles.dropdown}
        placeholderStyle={S.statusDropdownStyles.placeholder}
        selectedTextStyle={[
          S.statusDropdownStyles.selectedText,
          { color: selectedStatusColor },
        ]}
        iconStyle={[
          S.statusDropdownStyles.icon,
          { tintColor: selectedStatusColor },
        ]}
        containerStyle={S.statusDropdownStyles.menuContainer}
        itemContainerStyle={{ borderRadius: 12 }}
        activeColor={theme.colors.GRAY_100}
        data={options}
        maxHeight={280}
        labelField="label"
        valueField="value"
        placeholder="Status"
        value={value}
        disable={disabled}
        dropdownPosition="bottom"
        renderLeftIcon={() => (
          <S.StatusLeftIconSlot>
            <S.StatusColorDot color={selectedStatusColor} />
          </S.StatusLeftIconSlot>
        )}
        renderItem={(item: OrderStatusOption, selected?: boolean) => {
          const optionColor = getOrderStatusColor(item.value);
          const optionSurface = getOrderStatusSurfaceColor(item.value);

          return (
            <S.StatusOptionRow
              backgroundColor={selected ? optionSurface : theme.colors.WHITE}
            >
              <S.StatusColorDot color={optionColor} />
              <S.StatusOptionLabel
                color={selected ? optionColor : theme.colors.GRAY_600}
              >
                {item.label}
              </S.StatusOptionLabel>
              {selected && (
                <S.StatusSelectedMark color={optionColor}>✓</S.StatusSelectedMark>
              )}
            </S.StatusOptionRow>
          );
        }}
        onChange={({ value: selectedStatus }: OrderStatusOption) => {
          onChange(selectedStatus);
        }}
      />
    </S.StatusDropdown>
  );
}

type OrderDetailStatusActionProps = {
  orderDetail: OrderDetailProps;
  orderStatusOptions: Array<{ label: string; value: OrderStatusProps }>;
  isUpdatingStatus: boolean;
  onStatusChange: (status: OrderStatusProps) => void;
};

export function OrderDetailStatusAction({
  orderDetail,
  orderStatusOptions,
  isUpdatingStatus,
  onStatusChange,
}: OrderDetailStatusActionProps) {
  return (
    <S.StatusActionCard>
      <S.StatusActionLabel>Alterar status do pedido</S.StatusActionLabel>
      <StatusSelect
        value={orderDetail.status}
        options={orderStatusOptions}
        disabled={isUpdatingStatus}
        onChange={onStatusChange}
      />
    </S.StatusActionCard>
  );
}
