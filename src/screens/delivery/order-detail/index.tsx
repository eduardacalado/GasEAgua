import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import {
  OrderDetailAddonsSection,
  OrderDetailAddressSection,
  OrderDetailCustomerSection,
  OrderDetailItemsSection,
} from "@components/order-detail/sections";
import { OrderDetailStatusAction } from "@components/order-detail/status-action";
import * as OrderDetailStyles from "@components/order-detail/styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import theme from "src/styles/theme";
import { useDeliveryOrderDetail } from "./use-delivery-order-detail";

type DeliveryOrderDetailRouteParams = {
  orderDetail: {
    orderId: number;
  };
};

export function DeliveryOrderDetailScreen() {
  const route =
    useRoute<RouteProp<DeliveryOrderDetailRouteParams, "orderDetail">>();
  const { orderId } = route.params;

  const {
    orderDetail,
    isLoading,
    isUpdatingStatus,
    orderStatusOptions,
    updateOrderStatus,
  } = useDeliveryOrderDetail(orderId);

  if (isLoading || !orderDetail) {
    return (
      <LinearGradientBackground>
        <OrderDetailStyles.SafeAreaViewContainer>
          <StatusBar style="light" />
          <CustomHeader />
          <ActivityIndicator size="large" color={theme.colors.WHITE} />
        </OrderDetailStyles.SafeAreaViewContainer>
      </LinearGradientBackground>
    );
  }

  return (
    <LinearGradientBackground>
      <OrderDetailStyles.SafeAreaViewContainer>
        <StatusBar style="light" />
        <CustomHeader />
        <OrderDetailStatusAction
          orderDetail={orderDetail}
          orderStatusOptions={orderStatusOptions}
          isUpdatingStatus={isUpdatingStatus}
          onStatusChange={updateOrderStatus}
        />
        <OrderDetailStyles.ScrollViewContainer>
          <OrderDetailStyles.ContentContainer>
            <OrderDetailCustomerSection orderDetail={orderDetail} />
            <OrderDetailAddressSection orderDetail={orderDetail} />
            <OrderDetailItemsSection orderDetail={orderDetail} />
            <OrderDetailAddonsSection orderDetail={orderDetail} />
          </OrderDetailStyles.ContentContainer>
        </OrderDetailStyles.ScrollViewContainer>
      </OrderDetailStyles.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
