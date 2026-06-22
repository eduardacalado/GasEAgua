import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import {
  OrderDetailAddonsSection,
  OrderDetailAddressSection,
  OrderDetailItemsSection,
  OrderDetailTransactionsSection,
} from "@components/order-detail/sections";
import { OrderDetailSummaryCard } from "@components/order-detail/summary-card";
import * as OrderDetailStyles from "@components/order-detail/styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { useOrderDetailData } from "src/hooks/use-order-detail-data";
import theme from "src/styles/theme";

type UserOrderDetailRouteParams = {
  orderDetail: {
    orderId: number;
  };
};

export function UserOrderDetailScreen() {
  const route =
    useRoute<RouteProp<UserOrderDetailRouteParams, "orderDetail">>();
  const { orderId } = route.params;

  const { orderDetail, isLoading, getPaymentStateLabel } =
    useOrderDetailData(orderId);

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
        <OrderDetailStyles.ScrollViewContainer>
          <OrderDetailStyles.ContentContainer>
            <OrderDetailSummaryCard
              orderDetail={orderDetail}
              getPaymentStateLabel={getPaymentStateLabel}
            />
            <OrderDetailAddressSection orderDetail={orderDetail} />
            <OrderDetailItemsSection orderDetail={orderDetail} />
            <OrderDetailAddonsSection orderDetail={orderDetail} />
            <OrderDetailTransactionsSection orderDetail={orderDetail} />
          </OrderDetailStyles.ContentContainer>
        </OrderDetailStyles.ScrollViewContainer>
      </OrderDetailStyles.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
