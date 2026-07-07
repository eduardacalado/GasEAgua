import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getUsersList } from "src/services/user";
import { AdminUserListItem } from "src/services/user/types";

const pageSize = 10;
const searchDebounceMilliseconds = 500;

export function useAdminUsersList() {
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, searchDebounceMilliseconds);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const loadUsersPage = useCallback(
    async (pageNumber: number, shouldAppend: boolean) => {
      setRefreshing(true);

      try {
        const usersListResponse = await getUsersList({
          page: pageNumber,
          limit: pageSize,
          search: debouncedSearchTerm || undefined,
          sort: "open_first",
        });

        setUsers((previousUsers) =>
          shouldAppend
            ? [...previousUsers, ...usersListResponse.users]
            : usersListResponse.users
        );
        setCurrentPage(pageNumber);
        setHasMoreUsers(pageNumber < usersListResponse.totalPages);
        setLoadError(null);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ??
          error.message ??
          "tente novamente";
        setLoadError(errorMessage);
        Toast.show({
          type: "error",
          text2: `Erro ${errorMessage.toLowerCase()}`,
        });
      } finally {
        setRefreshing(false);
      }
    },
    [debouncedSearchTerm]
  );

  const reloadUsersList = useCallback(async () => {
    setHasMoreUsers(true);
    await loadUsersPage(1, false);
  }, [loadUsersPage]);

  const loadNextUsersPage = useCallback(async () => {
    if (!hasMoreUsers || refreshing || users.length === 0) {
      return;
    }

    await loadUsersPage(currentPage + 1, true);
  }, [currentPage, hasMoreUsers, loadUsersPage, refreshing, users.length]);

  useFocusEffect(
    useCallback(() => {
      reloadUsersList();
    }, [reloadUsersList])
  );

  useEffect(() => {
    reloadUsersList();
  }, [debouncedSearchTerm, reloadUsersList]);

  return {
    users,
    searchTerm,
    setSearchTerm,
    refreshing,
    loadError,
    reloadUsersList,
    loadNextUsersPage,
  };
}
