import { OrderStatusText } from "@components/order-status-text";
import { Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import theme from "src/styles/theme";
import { OrderProps } from "src/types/orders";
import * as Styled from "./styles";

export type CardProps = {
  showUserName?: boolean;
  username?: string;
  rightAction?: () => void;
  leftAction?: () => void;
};

type AdminScheduleCardProps = OrderProps & CardProps;

export const OrderCard = ({
  updated_at,
  status,
  username,
  showUserName,
  rightAction,
  leftAction,
}: AdminScheduleCardProps) => {
  const leftSwipe = () => {
    return (
      <TouchableOpacity onPress={leftAction} activeOpacity={0.6}>
        <Styled.LeftActionContainer>
          <Entypo name="block" size={40} color={theme.colors.WHITE} />
        </Styled.LeftActionContainer>
      </TouchableOpacity>
    );
  };

  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={rightAction} activeOpacity={0.6}>
        <Styled.RightActionContainer>
          <Entypo name="check" size={40} color={theme.colors.WHITE} />
        </Styled.RightActionContainer>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderLeftActions={leftSwipe}
      renderRightActions={rightSwipe}
      enabled={rightAction || leftAction ? true : false}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      containerStyle={{
        height: 112,
      }}
    >
      <Styled.CardContainer>
        <Styled.StatusSideContainer>
          <OrderStatusText status={status} />
          <Styled.CardText>1 Gas e 2 Agua</Styled.CardText>
          {showUserName && <Styled.CardText>{username}</Styled.CardText>}
        </Styled.StatusSideContainer>
        <Styled.DateContainer>
          <Styled.CardText>
            {dayjs(updated_at).format("DD/MM/YYYY")}{" "}
          </Styled.CardText>
          <Styled.CardText>
            {dayjs(updated_at).format("HH:mm")}{" "}
          </Styled.CardText>
        </Styled.DateContainer>
      </Styled.CardContainer>
    </Swipeable>
  );
};
