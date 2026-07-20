import {
  getOrderStatusColor,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
import theme from "src/styles/theme";
import { OrderStatusProps } from "src/types/orders";

type OrdersFilterAppearanceParams = {
  selectedStatus?: OrderStatusProps | null;
  date?: Date | null;
  hasActiveFilters: boolean;
};

export function getOrdersFilterAppearance({
  selectedStatus,
  date,
  hasActiveFilters,
}: OrdersFilterAppearanceParams) {
  const hasSelectedStatus = Boolean(selectedStatus);
  const hasSelectedDate = Boolean(date);
  const statusFilterColor = selectedStatus
    ? getOrderStatusColor(selectedStatus)
    : theme.colors.GRAY_300;
  const statusFilterSurface = selectedStatus
    ? getOrderStatusSurfaceColor(selectedStatus)
    : theme.colors.GRAY_100;
  const dateFilterColor = hasSelectedDate
    ? theme.colors.ORANGE_200
    : theme.colors.GRAY_300;
  const dateFilterSurface = hasSelectedDate
    ? theme.colors.ORANGE_50
    : theme.colors.GRAY_100;

  return {
    hasSelectedStatus,
    hasSelectedDate,
    statusFilterColor,
    statusFilterSurface,
    dateFilterColor,
    dateFilterSurface,
    statusShellBackgroundColor: hasSelectedStatus
      ? statusFilterSurface
      : theme.colors.WHITE,
    dateButtonBackgroundColor: hasSelectedDate
      ? dateFilterSurface
      : theme.colors.WHITE,
    dateButtonTextColor: hasSelectedDate
      ? theme.colors.ORANGE_200
      : theme.colors.GRAY_600,
    selectedTextColor: hasSelectedStatus
      ? statusFilterColor
      : theme.colors.GRAY_600,
    iconTintColor: hasSelectedStatus
      ? statusFilterColor
      : theme.colors.GRAY_300,
    clearFilterBackgroundColor: hasActiveFilters
      ? theme.colors.RED_100
      : "#C5C5C5",
    clearFilterIconColor: hasActiveFilters
      ? theme.colors.WHITE
      : "#F2F2F2",
  };
}
