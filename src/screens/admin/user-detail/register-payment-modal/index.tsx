import { Button } from "@components/button";
import { CustomText } from "@components/custom-text";
import { PaymentMethod } from "src/services/transactions/types";
import { Modal, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import theme from "src/styles/theme";
import * as S from "./styles";

type PaymentAccountOption = {
  label: string;
  value: number;
};

type PaymentMethodOption = {
  label: string;
  value: PaymentMethod;
};

type RegisterPaymentModalProps = {
  visible: boolean;
  isSubmittingPayment: boolean;
  paymentAccountOptions: PaymentAccountOption[];
  paymentMethodOptions: PaymentMethodOption[];
  selectedPaymentAccountId: number | null;
  paymentAmountInput: string;
  paymentMethod: PaymentMethod | null;
  paymentNotes: string;
  onClose: () => void;
  onSubmit: () => void;
  onPaymentAccountChange: (accountId: number) => void;
  onPaymentAmountChange: (amount: string) => void;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onPaymentNotesChange: (notes: string) => void;
};

export function RegisterPaymentModal({
  visible,
  isSubmittingPayment,
  paymentAccountOptions,
  paymentMethodOptions,
  selectedPaymentAccountId,
  paymentAmountInput,
  paymentMethod,
  paymentNotes,
  onClose,
  onSubmit,
  onPaymentAccountChange,
  onPaymentAmountChange,
  onPaymentMethodChange,
  onPaymentNotesChange,
}: RegisterPaymentModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <S.ModalOverlay>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
        <S.ModalContent>
          <S.ModalTitle>Registrar pagamento</S.ModalTitle>

          <S.FieldLabel>Conta</S.FieldLabel>
          <S.SortControlShell>
            <Dropdown
              style={S.dropdownStyles.dropdown}
              placeholderStyle={S.dropdownStyles.placeholder}
              selectedTextStyle={S.dropdownStyles.selectedText}
              iconStyle={S.dropdownStyles.icon}
              containerStyle={S.dropdownStyles.menuContainer}
              data={paymentAccountOptions}
              maxHeight={220}
              labelField="label"
              valueField="value"
              value={selectedPaymentAccountId}
              onChange={({ value }) => onPaymentAccountChange(value)}
            />
          </S.SortControlShell>

          <S.FieldLabel>Valor</S.FieldLabel>
          <S.FieldInput
            value={paymentAmountInput}
            onChangeText={onPaymentAmountChange}
            keyboardType="decimal-pad"
            placeholder="0,00"
            placeholderTextColor={theme.colors.GRAY_300}
          />

          <S.FieldLabel>Método de pagamento</S.FieldLabel>
          <S.SortControlShell>
            <Dropdown
              style={S.dropdownStyles.dropdown}
              placeholderStyle={S.dropdownStyles.placeholder}
              selectedTextStyle={S.dropdownStyles.selectedText}
              iconStyle={S.dropdownStyles.icon}
              containerStyle={S.dropdownStyles.menuContainer}
              data={paymentMethodOptions}
              maxHeight={220}
              labelField="label"
              valueField="value"
              value={paymentMethod}
              onChange={({ value }) => onPaymentMethodChange(value)}
            />
          </S.SortControlShell>

          <S.FieldLabel>Observações</S.FieldLabel>
          <S.NotesInput
            value={paymentNotes}
            onChangeText={onPaymentNotesChange}
            placeholder="Opcional"
            placeholderTextColor={theme.colors.GRAY_300}
            multiline
          />

          <S.ModalActionsRow>
            <S.CancelButton onPress={onClose} disabled={isSubmittingPayment}>
              <S.CancelButtonText>Cancelar</S.CancelButtonText>
            </S.CancelButton>
            <Button
              color={theme.colors.GREEN}
              isLoading={isSubmittingPayment}
              onPress={onSubmit}
              style={{ flex: 1, marginBottom: 0 }}
            >
              <CustomText color={theme.colors.WHITE} fontWeight={theme.font.weight.bold}>
                Confirmar
              </CustomText>
            </Button>
          </S.ModalActionsRow>
        </S.ModalContent>
      </S.ModalOverlay>
    </Modal>
  );
}
