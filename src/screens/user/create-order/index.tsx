import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderTotal } from "@components/order-total";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { formatToBRL } from "src/helpers/format-currency";
import { NumberOrZero } from "src/helpers/utils";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useCreateOrder } from "./use-create-order";

export function UserCreateOrder() {
  const {
    stockLoading,
    products,
    addons,
    productQuantities,
    addonQuantities,
    navigateToOrderAddress,
    total,
    navigate,
    homeRouteName,
    incrementProduct,
    decrementProduct,
    incrementAddon,
    decrementAddon,
    totalItemsCount,
    hasAvailableStock,
    params,
  } = useCreateOrder();

  const renderAddonItem = (addon: {
    id: number;
    name: string;
    value: number;
  }) => {
    const subtotal =
      NumberOrZero(addonQuantities[addon.id]) * NumberOrZero(addon.value);

    return (
      <S.AddonItemContainer key={`addon-${addon.id}`}>
        <S.AddonItemTopContainer>
          <S.OrderTitle>{addon.name}</S.OrderTitle>
        </S.AddonItemTopContainer>

        <S.AddonItemBottomContainer>
          <S.AddonQuantityContainer>
            <TouchableOpacity onPress={() => decrementAddon(addon.id)}>
              <S.MinusPlusButton>
                <MaterialCommunityIcons
                  name="minus"
                  size={25}
                  color="#ffffff"
                />
              </S.MinusPlusButton>
            </TouchableOpacity>
            <S.SecondOrderAddItemNumber>
              {addonQuantities[addon.id] || 0}
            </S.SecondOrderAddItemNumber>

            <TouchableOpacity onPress={() => incrementAddon(addon.id)}>
              <S.MinusPlusButton>
                <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
              </S.MinusPlusButton>
            </TouchableOpacity>
          </S.AddonQuantityContainer>
          <S.ValueText>{formatToBRL(subtotal)}</S.ValueText>
        </S.AddonItemBottomContainer>
      </S.AddonItemContainer>
    );
  };

  const renderProductItem = (item: {
    id: number;
    name: string;
    value: number;
    quantity: number;
  }) => {
    const qty = NumberOrZero(productQuantities[item.id]);
    const unit = NumberOrZero(item.value);
    const subtotal = qty * unit;
    const isProductOutOfStock = item.quantity <= 0;
    const hasReachedStockLimit = qty >= item.quantity;

    return (
      <S.AddItemContainer key={`product-${item.id}`}>
        <S.AddItemLeftContainer>
          <TouchableOpacity
            onPress={() => decrementProduct(item.id)}
            disabled={isProductOutOfStock}
          >
            <S.MinusPlusButton>
              <MaterialCommunityIcons name="minus" size={25} color="#ffffff" />
            </S.MinusPlusButton>
          </TouchableOpacity>
          <S.SecondOrderAddItemNumber>
            {productQuantities[item.id] || 0}
          </S.SecondOrderAddItemNumber>

          <TouchableOpacity
            onPress={() => incrementProduct(item.id)}
            disabled={isProductOutOfStock || hasReachedStockLimit}
          >
            <S.MinusPlusButton>
              <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
            </S.MinusPlusButton>
          </TouchableOpacity>
        </S.AddItemLeftContainer>

        <S.AddItemRightContainer>
          <S.OrderTitle>{item.name}</S.OrderTitle>
          <S.OrderTitle>{formatToBRL(subtotal)}</S.OrderTitle>
        </S.AddItemRightContainer>
      </S.AddItemContainer>
    );
  };

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <S.ScrollViewContainer>
          <StatusBar style="light" />
          <CustomHeader handleBack={() => navigate(homeRouteName)} />
          {stockLoading ? (
            <S.AddressContainer>
              <ActivityIndicator size="large" color={theme.colors.WHITE} />
            </S.AddressContainer>
          ) : (
            <>
              <S.AddressContainer>
                <S.ImageContainer>
                  <S.OrderImage
                    source={
                      params.type === "GAS"
                        ? require("../../../../assets/images/gasLogo.png")
                        : require("../../../../assets/images/aguaLogo.png")
                    }
                  />
                </S.ImageContainer>

                <S.OrderContainer>
                  {hasAvailableStock ? (
                    products.map(renderProductItem)
                  ) : (
                    <S.UnavailableStockMessage>
                      No momento não há produtos disponíveis em estoque.
                    </S.UnavailableStockMessage>
                  )}
                </S.OrderContainer>

                {hasAvailableStock && (
                  <S.AddonBoxContainer>
                    {addons.map(renderAddonItem)}
                  </S.AddonBoxContainer>
                )}
              </S.AddressContainer>

              {hasAvailableStock && (
                <>
                  <S.OrderTotalContainer>
                    <OrderTotal
                      totalItems={totalItemsCount}
                      totalValue={total}
                    />
                  </S.OrderTotalContainer>

                  <S.ButtonContainer>
                    <Button
                      onPress={navigateToOrderAddress}
                      color={theme.colors.ORANGE_200}
                      disabled={totalItemsCount === 0}
                    >
                      <S.ConfirmOrderButtonText>
                        Continuar
                      </S.ConfirmOrderButtonText>
                    </Button>
                  </S.ButtonContainer>
                </>
              )}
            </>
          )}
        </S.ScrollViewContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
