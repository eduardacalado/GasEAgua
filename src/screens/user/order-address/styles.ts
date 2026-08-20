import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
  justify-content: flex-start;
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
`;

export const AddressContainer = styled.View`
  elevation: 5;
  margin-top: ${theme.size.m7};
  margin-bottom: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AddressSubContainer = styled.View`
  padding: ${theme.font.size.m6};
  padding-top: ${theme.font.size.m10};
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  gap: ${theme.size.base};
  width: 100%;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const Title = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m5};
`;

export const AddressTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.size.m4};
`;

export const OrderSummaryContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  padding: ${theme.font.size.m6};
  margin-bottom: ${theme.size.m6};
  border-radius: ${theme.size.m6};
  align-items: center;
  justify-content: center;
  width: 100%;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const OrderItem = styled.View`
  width: 100%;
  gap: ${theme.size.m3};
  margin-top: ${theme.size.m4};
`;

export const OrderItemRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const OrderItemText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const OrderItemValue = styled.Text`
  color: ${theme.colors.ORANGE_300};
  font-size: ${theme.font.size.m5};
  font-weight: ${theme.font.weight.bold};
`;

export const OrderTotalContainer = styled.View`
  margin-top: ${theme.size.m5};
  margin-bottom: ${theme.size.m10};
`;

export const IntendedPaymentMethodContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  padding: ${theme.font.size.m6};
  margin-bottom: ${theme.size.m6};
  border-radius: ${theme.size.m6};
  gap: ${theme.size.m4};
  width: 100%;
  z-index: 2;
  elevation: 6;

  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 3px;
`;

export const IntendedPaymentMethodDropdownShell = styled.View`
  min-height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.GRAY_100};
  padding-horizontal: 12px;
  justify-content: center;
`;

export const IntendedPaymentMethodOptionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m3};
  padding-vertical: 12px;
  padding-horizontal: 12px;
`;

export const IntendedPaymentMethodOptionLabel = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: 16px;
  font-weight: bold;
`;

export const SelectedIntendedPaymentMethodIcon = styled.View`
  margin-right: 8px;
`;

export const ButtonContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${theme.size.m6};
`;

export const InputArea = styled.View`
  padding: ${theme.size.base};
  width: 100%;
  align-items: center;
  border-radius: ${theme.size.m4};
  border: ${theme.colors.GRAY_200};
  background-color: ${theme.colors.GRAY_100};
  flex-direction: row;
  flex: 1;
  max-height: 55px;
`;

export const Input = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  flex: 1;
  font-size: ${theme.size.m4};
  margin-left: ${theme.size.m2};
`;

export const SelectInput = styled(Picker)`
  color: ${theme.colors.GRAY_500};
  justify-content: center;
  text-align: start;
  font-size: ${theme.font.size.m6};
  border-radius: ${theme.size.m1};
  width: 100%;
`;

export const StreetNumberInputContainer = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const LabelError = styled.Text`
  align-self: flex-start;
  color: #ff375b;
`;

export const intendedPaymentMethodDropdownStyles: {
  dropdown: ViewStyle;
  placeholder: TextStyle;
  selectedText: TextStyle;
  icon: ImageStyle;
  menuContainer: ViewStyle;
} = {
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
    color: theme.colors.GRAY_600,
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
    elevation: 8,
  },
};
