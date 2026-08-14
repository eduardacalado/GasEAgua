import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderTotal } from "@components/order-total";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
  ENGENHO_OPTIONS,
} from "src/constants/localOptions";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useOrderAddress } from "./use-order-address";

export function OrderAddress() {
  const {
    params,
    address,
    isLoading,
    isAdmin,
    handleCreateOrder,
    handleCreateAdminOrder,
    handleSubmit,
    control,
    errors,
    setValue,
    mainLocal,
    setMainLocal,
    selectedEngenho,
    setSelectedEngenho,
    navigate,
    orderSummary,
    handChangeAddress,
  } = useOrderAddress();

  let confirmOrderAction = handleCreateOrder;
  let keyboardAvoidingBehavior: "padding" | undefined;

  if (isAdmin) {
    confirmOrderAction = handleSubmit(handleCreateAdminOrder);
  }

  if (Platform.OS === "ios") {
    keyboardAvoidingBehavior = "padding";
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
                {isAdmin ? (
                  <>
                    <Controller
                      control={control}
                      name="local"
                      render={({ field: { onChange } }) => (
                        <S.InputArea>
                          <S.SelectInput
                            selectedValue={mainLocal}
                            onValueChange={(value: string) => {
                              onChange(value);
                              setMainLocal(value);
                              if (value === DEFAULT_CITY) {
                                setValue("local", DEFAULT_CITY);
                              }
                            }}
                          >
                            <S.SelectInput.Item
                              label={DEFAULT_CITY}
                              value={DEFAULT_CITY}
                            />
                            <S.SelectInput.Item
                              label={DEFAULT_ENGENHO}
                              value={DEFAULT_ENGENHO}
                            />
                          </S.SelectInput>
                        </S.InputArea>
                      )}
                    />

                    {mainLocal === DEFAULT_ENGENHO && (
                      <S.InputArea>
                        <S.SelectInput
                          selectedValue={selectedEngenho}
                          onValueChange={(value: string) => {
                            setSelectedEngenho(value);
                            setValue("local", value);
                          }}
                        >
                          {ENGENHO_OPTIONS.map((option) => (
                            <S.SelectInput.Item
                              key={option}
                              label={option}
                              value={option}
                            />
                          ))}
                        </S.SelectInput>
                      </S.InputArea>
                    )}

                    {mainLocal !== DEFAULT_ENGENHO && (
                      <S.StreetNumberInputContainer>
                        <Controller
                          control={control}
                          name="street"
                          render={({ field: { onChange, value } }) => (
                            <S.InputArea>
                              <MaterialCommunityIcons
                                name="map-marker"
                                size={20}
                                color="#7e7e7e"
                              />
                              <S.Input
                                value={value}
                                onChangeText={onChange}
                                placeholder="Rua"
                              />
                            </S.InputArea>
                          )}
                        />
                        <Controller
                          control={control}
                          name="number"
                          render={({ field: { onChange, value } }) => (
                            <S.InputArea>
                              <MaterialCommunityIcons
                                name="map-marker"
                                size={20}
                                color="#7e7e7e"
                              />
                              <S.Input
                                value={value}
                                onChangeText={onChange}
                                placeholder="Número"
                              />
                            </S.InputArea>
                          )}
                        />
                      </S.StreetNumberInputContainer>
                    )}

                    <Controller
                      control={control}
                      name="reference"
                      render={({ field: { onChange, value } }) => (
                        <S.InputArea>
                          <MaterialCommunityIcons
                            name="map-marker"
                            size={20}
                            color="#7e7e7e"
                          />
                          <S.Input
                            placeholder="Referência"
                            onChangeText={onChange}
                            value={value}
                          />
                        </S.InputArea>
                      )}
                    />

                    {errors.local && (
                      <S.LabelError>{errors.local.message}</S.LabelError>
                    )}
                    {errors.street && (
                      <S.LabelError>{errors.street.message}</S.LabelError>
                    )}
                    {errors.number && (
                      <S.LabelError>{errors.number.message}</S.LabelError>
                    )}
                    {errors.reference && (
                      <S.LabelError>{errors.reference.message}</S.LabelError>
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
                      <S.SubTitle>
                        {address?.street} {address?.number}
                      </S.SubTitle>
                    </S.AddressTextContainer>

                    <S.Title>Referência</S.Title>
                    <S.SubTitle>{address?.reference}</S.SubTitle>

                    <S.AlterAddressButton onPress={handChangeAddress}>
                      <S.AlterLocationButtonText>
                        Alterar endereço de entrega
                      </S.AlterLocationButtonText>
                    </S.AlterAddressButton>
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

            <S.OrderTotalContainer>
              <OrderTotal
                totalItems={orderSummary.totalItems}
                totalValue={params.totalValue}
              />
            </S.OrderTotalContainer>

            <S.ButtonContainer>
              <Button
                onPress={confirmOrderAction}
                isLoading={isLoading}
                color={theme.colors.ORANGE_200}
              >
                <S.ConfirmOrderButtonText>
                  Confirmar pedido
                </S.ConfirmOrderButtonText>
              </Button>
            </S.ButtonContainer>
          </S.ScrollViewContainer>
        </S.SafeAreaViewContainer>
      </KeyboardAvoidingView>
    </LinearGradientBackground>
  );
}
