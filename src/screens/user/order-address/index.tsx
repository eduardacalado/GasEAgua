import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderTotal } from "@components/order-total";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useOrderAddress } from "./use-order-address";

export function OrderAddress() {
  const {
    params,
    address,
    isLoading,
    handleCreateOrder,
    navigate,
    orderSummary,
    handChangeAddress,
  } = useOrderAddress();

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />
        <CustomHeader
          handleBack={() => navigate("userCreateOrder", { type: params.type })}
        />

        <S.AddressContainer>
          <S.AddressSubContainer>
            <S.Title>Endereço de entrega</S.Title>
            <S.AddressTextContainer>
              <MaterialIcons name="location-pin" size={20} color="#7e7e7e" />
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
            onPress={handleCreateOrder}
            isLoading={isLoading}
            color={theme.colors.ORANGE_200}
          >
            <S.ConfirmOrderButtonText>
              Confirmar pedido
            </S.ConfirmOrderButtonText>
          </Button>
        </S.ButtonContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
