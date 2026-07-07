import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getUserTransactions } from "src/services/transactions";
import {
  TransactionSortOption,
  UserAccountTransactionHistoryItem,
} from "src/services/transactions/types";
import { getUserAccounts, getUserById } from "src/services/user";
import {
  AccountSortOption,
  AdminUserListItem,
  UserAccountProps,
} from "src/services/user/types";

const transactionsPageSize = 20;

export function useAdminUserDetail(userId: number) {
  const [userDetail, setUserDetail] = useState<AdminUserListItem | null>(null);
  const [userAccounts, setUserAccounts] = useState<UserAccountProps[]>([]);
  const [transactions, setTransactions] = useState<
    UserAccountTransactionHistoryItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [accountSort, setAccountSort] = useState<AccountSortOption>("open_first");
  const [transactionSort, setTransactionSort] =
    useState<TransactionSortOption>("date_desc");
  const [selectedAccountFilter, setSelectedAccountFilter] = useState<
    number | "all"
  >("all");
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(true);

  const loadUserDetail = useCallback(async () => {
    try {
      const user = await getUserById(userId);
      setUserDetail(user);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    }
  }, [userId]);

  const loadUserAccounts = useCallback(async () => {
    setIsLoadingAccounts(true);

    try {
      const accounts = await getUserAccounts({
        userId,
        sort: accountSort,
      });
      setUserAccounts(accounts);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "tente novamente";
      Toast.show({
        type: "error",
        text2: `Erro ${errorMessage.toLowerCase()}`,
      });
    } finally {
      setIsLoadingAccounts(false);
    }
  }, [accountSort, userId]);

  const loadTransactionsPage = useCallback(
    async (pageNumber: number, shouldAppend: boolean) => {
      setIsLoadingTransactions(true);

      try {
        const transactionsResponse = await getUserTransactions({
          userId,
          page: pageNumber,
          limit: transactionsPageSize,
          sort: transactionSort,
          orderId:
            selectedAccountFilter === "all"
              ? undefined
              : selectedAccountFilter,
        });

        setTransactions((previousTransactions) =>
          shouldAppend
            ? [...previousTransactions, ...transactionsResponse.items]
            : transactionsResponse.items
        );
        setTransactionsPage(pageNumber);
        setHasMoreTransactions(
          pageNumber < transactionsResponse.pagination.totalPages
        );
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "tente novamente";
        Toast.show({
          type: "error",
          text2: `Erro ${errorMessage.toLowerCase()}`,
        });
      } finally {
        setIsLoadingTransactions(false);
      }
    },
    [selectedAccountFilter, transactionSort, userId]
  );

  const reloadTransactions = useCallback(async () => {
    setHasMoreTransactions(true);
    await loadTransactionsPage(1, false);
  }, [loadTransactionsPage]);

  const loadMoreTransactions = useCallback(async () => {
    if (!hasMoreTransactions || isLoadingTransactions) {
      return;
    }

    await loadTransactionsPage(transactionsPage + 1, true);
  }, [
    hasMoreTransactions,
    isLoadingTransactions,
    loadTransactionsPage,
    transactionsPage,
  ]);

  const reloadUserDetailScreen = useCallback(async () => {
    setIsLoading(true);

    await Promise.all([
      loadUserDetail(),
      loadUserAccounts(),
      reloadTransactions(),
    ]);

    setIsLoading(false);
  }, [loadUserAccounts, loadUserDetail, reloadTransactions]);

  useFocusEffect(
    useCallback(() => {
      reloadUserDetailScreen();
    }, [reloadUserDetailScreen])
  );

  useEffect(() => {
    loadUserAccounts();
  }, [loadUserAccounts]);

  useEffect(() => {
    reloadTransactions();
  }, [reloadTransactions]);

  const accountFilterOptions = [
    { label: "Todas as contas", value: "all" as const },
    ...userAccounts.map((account) => ({
      label: `Conta #${account.id}`,
      value: account.id,
    })),
  ];

  const accountSortOptions = [
    { label: "Em aberto primeiro", value: "open_first" as AccountSortOption },
    { label: "Mais recentes", value: "date_desc" as AccountSortOption },
    { label: "Mais antigas", value: "date_asc" as AccountSortOption },
    { label: "Maior saldo", value: "balance_desc" as AccountSortOption },
    { label: "Menor saldo", value: "balance_asc" as AccountSortOption },
  ];

  const transactionSortOptions = [
    { label: "Mais recentes", value: "date_desc" as TransactionSortOption },
    { label: "Mais antigas", value: "date_asc" as TransactionSortOption },
    { label: "Maior valor", value: "amount_desc" as TransactionSortOption },
    { label: "Menor valor", value: "amount_asc" as TransactionSortOption },
  ];

  return {
    userDetail,
    userAccounts,
    transactions,
    isLoading,
    isLoadingAccounts,
    isLoadingTransactions,
    accountSort,
    setAccountSort,
    transactionSort,
    setTransactionSort,
    selectedAccountFilter,
    setSelectedAccountFilter,
    accountFilterOptions,
    accountSortOptions,
    transactionSortOptions,
    hasMoreTransactions,
    loadMoreTransactions,
    reloadUserDetailScreen,
  };
}
