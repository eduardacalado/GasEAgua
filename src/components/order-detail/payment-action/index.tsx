import { Dropdown } from "react-native-element-dropdown";
import {
  getPaymentStateColor,
  getPaymentStateSurfaceColor,
} from "src/helpers/payment-state";
import theme from "src/styles/theme";
import { OrderDetailProps, OrderPaymentStatus } from "src/types/orders";
import * as S from "../styles";

type PaymentStateOption = {
  label: string;
  value: OrderPaymentStatus;
};

type PaymentStateSelectProps = {
  value: OrderPaymentStatus;
  options: PaymentStateOption[];
  disabled?: boolean;
  onChange: (paymentState: OrderPaymentStatus) => void;
};

function PaymentStateSelect({
  value,
  options,
  disabled,
  onChange,
}: PaymentStateSelectProps) {
  const selectedColor = getPaymentStateColor(value);
  const selectedSurface = getPaymentStateSurfaceColor(value);

  return (
    <S.StatusDropdown
      borderColor={selectedColor}
      backgroundColor={selectedSurface}
    >
      <Dropdown
        key={`payment-state-${value}`}
        style={S.statusDropdownStyles.dropdown}
        placeholderStyle={S.statusDropdownStyles.placeholder}
        selectedTextStyle={[
          S.statusDropdownStyles.selectedText,
          { color: selectedColor },
        ]}
        iconStyle={[
          S.statusDropdownStyles.icon,
          { tintColor: selectedColor },
        ]}
        containerStyle={S.statusDropdownStyles.menuContainer}
        itemContainerStyle={{ borderRadius: 12 }}
        activeColor={theme.colors.GRAY_100}
        data={options}
        maxHeight={280}
        labelField="label"
        valueField="value"
        placeholder="Pagamento"
        value={value}
        disable={disabled}
        dropdownPosition="bottom"
        renderLeftIcon={() => (
          <S.StatusLeftIconSlot>
            <S.StatusColorDot color={selectedColor} />
          </S.StatusLeftIconSlot>
        )}
        renderItem={(item: PaymentStateOption, selected?: boolean) => {
          const optionColor = getPaymentStateColor(item.value);
          const optionSurface = getPaymentStateSurfaceColor(item.value);

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
        onChange={({ value: selectedPaymentState }: PaymentStateOption) => {
          onChange(selectedPaymentState);
        }}
      />
    </S.StatusDropdown>
  );
}

type OrderDetailPaymentActionProps = {
  orderDetail: OrderDetailProps;
  paymentStateOptions: PaymentStateOption[];
  isUpdatingPaymentState: boolean;
  onPaymentStateChange: (paymentState: OrderPaymentStatus) => void;
};

export function OrderDetailPaymentAction({
  orderDetail,
  paymentStateOptions,
  isUpdatingPaymentState,
  onPaymentStateChange,
}: OrderDetailPaymentActionProps) {
  return (
    <S.StatusActionCard>
      <S.StatusActionLabel>Alterar status de pagamento</S.StatusActionLabel>
      <PaymentStateSelect
        value={orderDetail.payment_state}
        options={paymentStateOptions}
        disabled={isUpdatingPaymentState}
        onChange={onPaymentStateChange}
      />
    </S.StatusActionCard>
  );
}
