import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import theme from "src/styles/theme";
import { AdminUserListItem } from "src/services/user/types";
import * as S from "./styles";

type UsersListProps = {
  users: AdminUserListItem[];
  emptyListMessage: string;
  onRefresh: () => void;
  onEndList?: () => void;
  refreshing: boolean;
  itemSeparatorComponent: React.ComponentType;
  renderItem: ListRenderItem<AdminUserListItem>;
};

export function UsersList({
  users,
  emptyListMessage,
  onRefresh,
  onEndList,
  refreshing,
  itemSeparatorComponent,
  renderItem,
}: UsersListProps) {
  const footerComponent = () => {
    if (!refreshing) {
      return null;
    }

    return <ActivityIndicator size="large" />;
  };

  return (
    <S.CardArea>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={refreshing}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={theme.colors.WHITE}
          />
        }
        ListEmptyComponent={
          <S.EmptyListContainer>
            <S.EmptyListText>{emptyListMessage}</S.EmptyListText>
          </S.EmptyListContainer>
        }
        onEndReached={onEndList}
        ListFooterComponent={footerComponent}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
    </S.CardArea>
  );
}
