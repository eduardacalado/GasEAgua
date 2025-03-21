import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { OrderProps } from "src/types/orders";
import * as S from "./styles";

type OrderListProps = {
  orders?: OrderProps[] | undefined;
  emptyArrayMessage: string;
  showUserName?: boolean;
  onRefresh: () => void;
  onEndList?: () => void;
  refreshing: boolean;
  listHeaderComponent: React.ReactElement | null;
  itemSeparatorComponent: React.ComponentType<any>;
  rightButtonAction?: (id: string) => void;
  leftButtonAction?: (id: string) => void;
  renderItem: ListRenderItem<OrderProps>;
};

export const OrderList = ({
  orders,
  emptyArrayMessage,
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

  return (
    <S.CardArea>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={refreshing}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={"#fff"}
          />
        }
        ListEmptyComponent={
          <S.Container>
            <S.TreatmentText> {emptyArrayMessage} </S.TreatmentText>
          </S.Container>
        }
        onEndReached={onEndList}
        ListFooterComponent={footerComponent}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
    </S.CardArea>
  );
};
