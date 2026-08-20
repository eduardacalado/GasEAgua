import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { OrderTotal } from "@components/order-total";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { formatToBRL } from "src/helpers/format-currency";
import {
  getAddonOrderLabel,
  getAddonSectionHeader,
  getProductOrderLabel,
} from "src/helpers/order-item-labels";
import { NumberOrZero } from "src/helpers/utils";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useCreateOrder } from "./use-create-order";

const GAS_ORDER_IMAGE = require("../../../../assets/images/gasLogo.png");
const WATER_ORDER_IMAGE = require("../../../../assets/images/aguaLogo.png");

function getSpecificOrderImageSource(orderType?: string) {
  if (orderType === "GAS") {
    return GAS_ORDER_IMAGE;
  }

  return WATER_ORDER_IMAGE;
}

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
  const [isAddonSectionExpanded, setIsAddonSectionExpanded] = useState(false);
  const addonSectionHeader = getAddonSectionHeader(isAddonSectionExpanded);
  const addonSectionChevronIconName = isAddonSectionExpanded
    ? "chevron-up"
    : "chevron-down";

  const toggleAddonSection = () => {
    setIsAddonSectionExpanded((currentIsExpanded) => !currentIsExpanded);
  };

  const hasSpecificOrderType =
    params?.type === "GAS" || params?.type === "WATER";
  const specificOrderImageSource = getSpecificOrderImageSource(params?.type);

  const renderOrderTypeImages = () => {
    if (hasSpecificOrderType) {
      return (
        <S.ImageContainer>
          <S.OrderImage source={specificOrderImageSource} />
        </S.ImageContainer>
      );
    }

    return (
      <S.DualOrderImagesContainer>
        <S.DualOrderImage source={GAS_ORDER_IMAGE} />
        <S.DualOrderImage source={WATER_ORDER_IMAGE} />
      </S.DualOrderImagesContainer>
    );
  };

  const renderAddonItem = (addon: {
    id: number;
    name: string;
    value: number;
    type: string;
  }) => {
    const subtotal =
      NumberOrZero(addonQuantities[addon.id]) * NumberOrZero(addon.value);
    const addonLabel = getAddonOrderLabel(addon.type, addon.name);

    return (
      <S.AddonItemContainer key={`addon-${addon.id}`}>
        <S.AddonItemTopContainer>
          <S.OrderTitle>{addonLabel.title}</S.OrderTitle>
          {addonLabel.subtitle && (
            <S.OrderItemSubtitle>{addonLabel.subtitle}</S.OrderItemSubtitle>
          )}
        </S.AddonItemTopContainer>

        <S.AddItemControlsRow>
          <S.AddItemLeftContainer>
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
          </S.AddItemLeftContainer>
          <S.OrderPrice>{formatToBRL(subtotal)}</S.OrderPrice>
        </S.AddItemControlsRow>
      </S.AddonItemContainer>
    );
  };

  const renderProductItem = (item: {
    id: number;
    name: string;
    value: number;
    quantity: number;
    type: string;
  }) => {
    const qty = NumberOrZero(productQuantities[item.id]);
    const unit = NumberOrZero(item.value);
    const subtotal = qty * unit;
    const isProductOutOfStock = item.quantity <= 0;
    const hasReachedStockLimit = qty >= item.quantity;
    const productLabel = getProductOrderLabel(item.type, item.name);

    return (
      <S.AddItemContainer key={`product-${item.id}`}>
        <S.ProductInfoContainer>
          <S.OrderTitle>{productLabel.title}</S.OrderTitle>
          {productLabel.subtitle && (
            <S.OrderItemSubtitle>{productLabel.subtitle}</S.OrderItemSubtitle>
          )}
        </S.ProductInfoContainer>
        <S.AddItemControlsRow>
          <S.AddItemLeftContainer>
            <TouchableOpacity
              onPress={() => decrementProduct(item.id)}
              disabled={isProductOutOfStock}
            >
              <S.MinusPlusButton>
                <MaterialCommunityIcons
                  name="minus"
                  size={25}
                  color="#ffffff"
                />
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
                <MaterialCommunityIcons
                  name="plus"
                  size={25}
                  color="#ffffff"
                />
              </S.MinusPlusButton>
            </TouchableOpacity>
          </S.AddItemLeftContainer>
          <S.OrderPrice>{formatToBRL(subtotal)}</S.OrderPrice>
        </S.AddItemControlsRow>
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
                {renderOrderTypeImages()}

                <S.OrderContainer>
                  <S.OrderSectionTitle>Reposição</S.OrderSectionTitle>
                  {hasAvailableStock ? (
                    products.map(renderProductItem)
                  ) : (
                    <S.UnavailableStockMessage>
                      No momento não há produtos disponíveis em estoque.
                    </S.UnavailableStockMessage>
                  )}
                </S.OrderContainer>

                {hasAvailableStock && addons.length > 0 && (
                  <S.AddonSectionContainer>
                    <S.AddonSectionHeader
                      onPress={toggleAddonSection}
                      accessibilityRole="button"
                      accessibilityState={{
                        expanded: isAddonSectionExpanded,
                      }}
                    >
                      <S.AddonSectionHeaderTextContainer>
                        <S.AddonSectionHeaderTitle>
                          {addonSectionHeader.title}
                        </S.AddonSectionHeaderTitle>
                        {addonSectionHeader.subtitle && (
                          <S.OrderItemSubtitle>
                            {addonSectionHeader.subtitle}
                          </S.OrderItemSubtitle>
                        )}
                      </S.AddonSectionHeaderTextContainer>
                      <MaterialCommunityIcons
                        name={addonSectionChevronIconName}
                        size={24}
                        color={theme.colors.ORANGE_300}
                      />
                    </S.AddonSectionHeader>
                    {isAddonSectionExpanded && addons.map(renderAddonItem)}
                  </S.AddonSectionContainer>
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
                      title="Continuar"
                      onPress={navigateToOrderAddress}
                      disabled={totalItemsCount === 0}
                    />
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
