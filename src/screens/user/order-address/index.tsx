import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderTotal } from "@components/order-total";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  getIntendedPaymentMethodOption,
  intendedPaymentMethodOptions,
  IntendedPaymentMethodOption,
} from "src/helpers/intended-payment-method";
import { DeliveryAddressForm } from "./delivery-address-form";
import * as S from "./styles";
import { useOrderAddress } from "./use-order-address";

function renderIntendedPaymentMethodItem(item: IntendedPaymentMethodOption) {
  return (
    <S.IntendedPaymentMethodOptionRow>
      <MaterialCommunityIcons
        name={item.icon}
        size={20}
        color={item.iconColor}
      />
      <S.IntendedPaymentMethodOptionLabel>
        {item.label}
      </S.IntendedPaymentMethodOptionLabel>
    </S.IntendedPaymentMethodOptionRow>
  );
}

export function OrderAddress() {
  const {
    params,
    address,
    deliveryAddressLine,
    isLoading,
    shouldShowDeliveryAddressForm,
    isEditingDeliveryAddress,
    handleCreateOrder,
    handleCreateOrderWithCustomAddress,
    handleSubmit,
    control,
    errors,
    mainLocal,
    selectedEngenho,
    handleMainLocalChange,
    handleEngenhoChange,
    navigate,
    orderSummary,
    handChangeAddress,
    handleUseProfileAddress,
    intendedPaymentMethod,
    handleIntendedPaymentMethodChange,
  } = useOrderAddress();

  let confirmOrderAction = handleCreateOrder;
  let keyboardAvoidingBehavior: "padding" | undefined;

  if (shouldShowDeliveryAddressForm) {
    confirmOrderAction = handleSubmit(handleCreateOrderWithCustomAddress);
  }

  if (Platform.OS === "ios") {
    keyboardAvoidingBehavior = "padding";
  }

  const selectedIntendedPaymentMethodOption = getIntendedPaymentMethodOption(
    intendedPaymentMethod
  );

  function renderSelectedIntendedPaymentMethodIcon() {
    if (!selectedIntendedPaymentMethodOption) {
      return null;
    }

    return (
      <MaterialCommunityIcons
        name={selectedIntendedPaymentMethodOption.icon}
        size={20}
        color={selectedIntendedPaymentMethodOption.iconColor}
        style={S.intendedPaymentMethodDropdownStyles.selectedIcon}
      />
    );
  }

  return (
    <LinearGradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingBehavior}
      >
        <S.SafeAreaViewContainer>
          <StatusBar style="light" />
          <CustomHeader
            handleBack={() =>
              navigate("userCreateOrder", { type: params?.type })
            }
          />

          <S.ScrollViewContainer>
            <S.AddressContainer>
              <S.AddressSubContainer>
                <S.Title>Endereço de entrega</S.Title>
                {shouldShowDeliveryAddressForm ? (
                  <>
                    <DeliveryAddressForm
                      control={control}
                      errors={errors}
                      mainLocal={mainLocal}
                      selectedEngenho={selectedEngenho}
                      onMainLocalChange={handleMainLocalChange}
                      onEngenhoChange={handleEngenhoChange}
                    />
                    {isEditingDeliveryAddress && (
                      <Button
                        variant="tertiary"
                        title="Usar endereço do perfil"
                        onPress={handleUseProfileAddress}
                        style={{ marginTop: 16 }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <S.AddressTextContainer>
                      <MaterialIcons
                        name="location-pin"
                        size={20}
                        color="#7e7e7e"
                      />
                      <S.SubTitle>{deliveryAddressLine}</S.SubTitle>
                    </S.AddressTextContainer>

                    <S.Title>Referência</S.Title>
                    <S.SubTitle>{address?.reference ?? "-"}</S.SubTitle>

                    <Button
                      variant="tertiary"
                      title="Alterar endereço de entrega"
                      onPress={handChangeAddress}
                      style={{ marginTop: 16 }}
                    />
                  </>
                )}
              </S.AddressSubContainer>
            </S.AddressContainer>

            <S.OrderSummaryContainer>
              <S.Title>Resumo do Pedido</S.Title>
              <S.OrderItem>
                {orderSummary.items.map((item) => (
                  <S.OrderItemRow key={`item-${item.id}`}>
                    <S.OrderItemText>
                      {item.quantity} {item.name}
                    </S.OrderItemText>
                    <S.OrderItemValue>{item.subtotal}</S.OrderItemValue>
                  </S.OrderItemRow>
                ))}
                {orderSummary.addons.map((addon) => (
                  <S.OrderItemRow key={`addon-${addon.id}`}>
                    <S.OrderItemText>
                      {addon.quantity} {addon.name}
                    </S.OrderItemText>
                    <S.OrderItemValue>{addon.subtotal}</S.OrderItemValue>
                  </S.OrderItemRow>
                ))}
              </S.OrderItem>
            </S.OrderSummaryContainer>

            <S.IntendedPaymentMethodContainer>
              <S.Title>Como pretende pagar</S.Title>
              <S.IntendedPaymentMethodDropdownShell>
                <Dropdown
                  style={S.intendedPaymentMethodDropdownStyles.dropdown}
                  placeholderStyle={
                    S.intendedPaymentMethodDropdownStyles.placeholder
                  }
                  selectedTextStyle={
                    S.intendedPaymentMethodDropdownStyles.selectedText
                  }
                  iconStyle={S.intendedPaymentMethodDropdownStyles.icon}
                  containerStyle={
                    S.intendedPaymentMethodDropdownStyles.menuContainer
                  }
                  data={intendedPaymentMethodOptions}
                  maxHeight={280}
                  labelField="label"
                  valueField="value"
                  placeholder="Opcional"
                  value={intendedPaymentMethod}
                  dropdownPosition="top"
                  renderItem={renderIntendedPaymentMethodItem}
                  renderLeftIcon={renderSelectedIntendedPaymentMethodIcon}
                  onChange={({ value }) =>
                    handleIntendedPaymentMethodChange(value)
                  }
                />
              </S.IntendedPaymentMethodDropdownShell>
            </S.IntendedPaymentMethodContainer>

            <S.OrderTotalContainer>
              <OrderTotal
                totalItems={orderSummary.totalItems}
                totalValue={params.totalValue}
              />
            </S.OrderTotalContainer>

            <S.ButtonContainer>
              <Button
                title="Confirmar pedido"
                onPress={confirmOrderAction}
                isLoading={isLoading}
              />
            </S.ButtonContainer>
          </S.ScrollViewContainer>
        </S.SafeAreaViewContainer>
      </KeyboardAvoidingView>
    </LinearGradientBackground>
  );
}
