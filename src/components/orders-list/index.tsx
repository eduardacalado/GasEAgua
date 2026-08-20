import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import theme from "src/styles/theme";
import { OrderProps } from "src/types/orders";
import * as S from "./styles";

type OrderListProps = {
  orders?: OrderProps[] | undefined;
  emptyArrayMessage: string;
  isLoadError?: boolean;
  showUserName?: boolean;
  onRefresh: () => void;
  onEndList?: () => void;
  refreshing: boolean;
  listHeaderComponent?: React.ReactElement | null;
  itemSeparatorComponent: React.ComponentType<any>;
  rightButtonAction?: (id: string) => void;
  leftButtonAction?: (id: string) => void;
  renderItem: ListRenderItem<OrderProps>;
};

export const OrderList = ({
  orders,
  emptyArrayMessage,
  isLoadError = false,
  onRefresh,
  refreshing,
  onEndList,
  listHeaderComponent,
  renderItem,
  itemSeparatorComponent,
}: OrderListProps) => {
  const footerComponent = () => {
    if (!refreshing) return <></>;

    return <ActivityIndicator size="large" />;
  };

  let emptyStateIconName: "alert-circle" | "inbox" = "inbox";
  let emptyStateIconColor = theme.colors.GRAY_300;
  let emptyStateBadgeColor = theme.colors.GRAY_100;

  if (isLoadError) {
    emptyStateIconName = "alert-circle";
    emptyStateIconColor = theme.colors.ORANGE_200;
    emptyStateBadgeColor = theme.colors.ORANGE_50;
  }

  return (
    <S.CardArea>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={refreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={S.listContentContainerStyle}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={"#fff"}
          />
        }
        ListEmptyComponent={
          <S.EmptyStateCard>
            <S.EmptyStateIconBadge backgroundColor={emptyStateBadgeColor}>
              <Feather
                name={emptyStateIconName}
                size={18}
                color={emptyStateIconColor}
              />
            </S.EmptyStateIconBadge>
            <S.EmptyStateText>{emptyArrayMessage}</S.EmptyStateText>
          </S.EmptyStateCard>
        }
        onEndReached={onEndList}
        ListFooterComponent={footerComponent}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
    </S.CardArea>
  );
};
