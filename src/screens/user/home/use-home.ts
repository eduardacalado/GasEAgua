import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { formatToBRL } from "src/helpers/format-currency";
import {
  getPaymentStateColor,
  getPaymentStateLabel,
  getPaymentStateSurfaceColor,
  isOpenAccount,
} from "src/helpers/payment-state";
import { getOrders } from "src/services/order";
import { OrderPaymentStatus, OrderProps } from "src/types/orders";

const OPEN_ACCOUNTS_FETCH_PAGE_SIZE = 100;
const VISIBLE_OPEN_ACCOUNTS_LIMIT = 3;

const paymentStateSortPriority: Record<OrderPaymentStatus, number> = {
  VENCIDO: 0,
  PARCIALMENTE_PAGO: 1,
  PENDENTE: 2,
  PAGO: 3,
};

export type HomeOpenAccount = {
  id: number;
  identifierLabel: string;
  paymentStateLabel: string;
  paymentStateColor: string;
  paymentStateSurfaceColor: string;
  paymentStateIconName: "alert-circle" | "minus-circle" | "clock";
  formattedBalance: string;
};

function getPaymentStateIconName(
  paymentState: OrderPaymentStatus
): HomeOpenAccount["paymentStateIconName"] {
  if (paymentState === "VENCIDO") {
    return "alert-circle";
  }

  if (paymentState === "PARCIALMENTE_PAGO") {
    return "minus-circle";
  }

  return "clock";
}

function sortOpenAccounts(firstAccount: OrderProps, secondAccount: OrderProps) {
  const paymentStateDifference =
    paymentStateSortPriority[firstAccount.payment_state] -
    paymentStateSortPriority[secondAccount.payment_state];

  if (paymentStateDifference !== 0) {
    return paymentStateDifference;
  }

  return (
    new Date(secondAccount.updated_at).getTime() -
    new Date(firstAccount.updated_at).getTime()
  );
}

function mapOrderToHomeOpenAccount(order: OrderProps): HomeOpenAccount {
  return {
    id: order.id,
    identifierLabel: `Conta #${order.id}`,
    paymentStateLabel: getPaymentStateLabel(order.payment_state),
    paymentStateColor: getPaymentStateColor(order.payment_state),
    paymentStateSurfaceColor: getPaymentStateSurfaceColor(order.payment_state),
    paymentStateIconName: getPaymentStateIconName(order.payment_state),
    formattedBalance: formatToBRL(order.total),
  };
}

export function useHome() {
  const [openAccounts, setOpenAccounts] = useState<HomeOpenAccount[]>([]);
  const [openAccountsCount, setOpenAccountsCount] = useState(0);
  const [overdueAccountsCount, setOverdueAccountsCount] = useState(0);
  const [formattedOpenBalance, setFormattedOpenBalance] = useState(
    formatToBRL(0)
  );
  const [isLoadingOpenAccounts, setIsLoadingOpenAccounts] = useState(true);

  const loadOpenAccounts = useCallback(async () => {
    setIsLoadingOpenAccounts(true);

    try {
      const orders = await getOrders({
        pageNumber: 0,
        pageSize: OPEN_ACCOUNTS_FETCH_PAGE_SIZE,
        scope: "me",
        openAccounts: true,
      });

      const unpaidOrders = orders
        .filter((order) => isOpenAccount(order.payment_state))
        .sort(sortOpenAccounts);

      const overdueCount = unpaidOrders.filter(
        (order) => order.payment_state === "VENCIDO"
      ).length;
      const openBalance = unpaidOrders.reduce(
        (totalBalance, order) => totalBalance + order.total,
        0
      );
      const visibleOpenAccounts = unpaidOrders
        .slice(0, VISIBLE_OPEN_ACCOUNTS_LIMIT)
        .map(mapOrderToHomeOpenAccount);

      setOpenAccounts(visibleOpenAccounts);
      setOpenAccountsCount(unpaidOrders.length);
      setOverdueAccountsCount(overdueCount);
      setFormattedOpenBalance(formatToBRL(openBalance));
    } catch {
      setOpenAccounts([]);
      setOpenAccountsCount(0);
      setOverdueAccountsCount(0);
      setFormattedOpenBalance(formatToBRL(0));
    } finally {
      setIsLoadingOpenAccounts(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadOpenAccounts();
    }, [loadOpenAccounts])
  );

  const hasOpenAccounts = openAccountsCount > 0;
  const remainingOpenAccountsCount = Math.max(
    openAccountsCount - openAccounts.length,
    0
  );

  let openAccountsCountLabel = `${openAccountsCount} contas em aberto`;
  if (openAccountsCount === 1) {
    openAccountsCountLabel = "1 conta em aberto";
  }

  let overdueAccountsCountLabel = `${overdueAccountsCount} vencidas`;
  if (overdueAccountsCount === 1) {
    overdueAccountsCountLabel = "1 vencida";
  }

  return {
    openAccounts,
    openAccountsCount,
    openAccountsCountLabel,
    overdueAccountsCount,
    overdueAccountsCountLabel,
    formattedOpenBalance,
    remainingOpenAccountsCount,
    isLoadingOpenAccounts,
    hasOpenAccounts,
    hasOverdueAccounts: overdueAccountsCount > 0,
  };
}
