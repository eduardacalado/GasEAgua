import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import {
  OrderDetailAddonsSection,
  OrderDetailAddressSection,
  OrderDetailCustomerSection,
  OrderDetailItemsSection,
  OrderDetailTransactionsSection,
} from "@components/order-detail/sections";
import { OrderDetailStatusAction } from "@components/order-detail/status-action";
import { OrderDetailSummaryCard } from "@components/order-detail/summary-card";
import * as OrderDetailStyles from "@components/order-detail/styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { useAdminOrderStatusUpdate } from "src/hooks/use-admin-order-status-update";
import { useOrderDetailData } from "src/hooks/use-order-detail-data";
import theme from "src/styles/theme";

type AdminOrderDetailRouteParams = {
  orderDetail: {
    orderId: number;
  };
};

export function AdminOrderDetailScreen() {
  const route =
    useRoute<RouteProp<AdminOrderDetailRouteParams, "orderDetail">>();
  const { orderId } = route.params;

  const { orderDetail, isLoading, getPaymentStateLabel, reloadOrderDetail } =
    useOrderDetailData(orderId);

  const {
    isUpdatingStatus,
    orderStatusOptions,
    updateOrderStatus,
  } = useAdminOrderStatusUpdate(orderId, orderDetail, reloadOrderDetail);

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
            <OrderDetailSummaryCard
              orderDetail={orderDetail}
              getPaymentStateLabel={getPaymentStateLabel}
            />
            <OrderDetailCustomerSection orderDetail={orderDetail} />
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
