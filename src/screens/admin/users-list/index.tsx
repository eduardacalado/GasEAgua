import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { UserCard } from "@components/user-card";
import { UsersList } from "@components/users-list";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminRoutes } from "src/routes/admin.routes";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useAdminUsersList } from "./use-admin-users-list";

type UserDetailNavigationProp = NativeStackNavigationProp<AdminRoutes>;

export function AdminUsersListScreen() {
  const navigation = useNavigation<UserDetailNavigationProp>();
  const {
    users,
    searchTerm,
    setSearchTerm,
    refreshing,
    loadError,
    reloadUsersList,
    loadNextUsersPage,
  } = useAdminUsersList();

  return (
    <LinearGradientBackground>
      <S.Container>
        <S.SearchContainer>
          <S.SearchInputShell>
            <Feather
              name="search"
              size={20}
              color={theme.colors.GRAY_300}
            />
            <S.SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Buscar por nome ou telefone"
              placeholderTextColor={theme.colors.GRAY_300}
              returnKeyType="search"
            />
            {searchTerm.length > 0 && (
              <S.ClearSearchButton onPress={() => setSearchTerm("")}>
                <Feather
                  name="x"
                  size={18}
                  color={theme.colors.GRAY_400}
                />
              </S.ClearSearchButton>
            )}
          </S.SearchInputShell>
        </S.SearchContainer>
        <UsersList
          users={users}
          refreshing={refreshing}
          onRefresh={reloadUsersList}
          onEndList={loadNextUsersPage}
          emptyListMessage={
            loadError
              ? "Não foi possível carregar os clientes. Verifique se o servidor está rodando e puxe para atualizar."
              : "Não há clientes cadastrados"
          }
          itemSeparatorComponent={S.Divider}
          renderItem={({ item }) => (
            <UserCard
              username={item.username}
              telephone={item.telephone}
              accountSummary={item.accountSummary}
              onPress={() =>
                navigation.navigate("userDetail", { userId: item.id })
              }
            />
          )}
        />
      </S.Container>
    </LinearGradientBackground>
  );
}
