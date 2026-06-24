import { CustomText } from "@components/custom-text";
import { OrderStatusText } from "@components/order-status-text";
import { Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { formatToBRL } from "src/helpers/format-currency";
import theme from "src/styles/theme";
import { OrderProps } from "src/types/orders";
import * as S from "./styles";

export type CardProps = {
  showUserName?: boolean;
  username?: string;
  rightAction?: () => void;
  leftAction?: () => void;
  onPress?: () => void;
};

type UserOrderCardProps = OrderProps & CardProps;

export const OrderCard = ({
  updated_at,
  status,
  username,
  showUserName,
  rightAction,
  leftAction,
  onPress,
  waterAmount,
  gasAmount,
  total,
}: UserOrderCardProps) => {
  const leftSwipe = () => {
    if (!leftAction) {
      return null;
    }

    return (
      <TouchableOpacity onPress={leftAction} activeOpacity={0.6}>
        <S.LeftActionContainer>
          <Entypo name="block" size={40} color={theme.colors.WHITE} />
        </S.LeftActionContainer>
      </TouchableOpacity>
    );
  };

  const rightSwipe = () => {
    if (!rightAction) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={rightAction}
        activeOpacity={0.6}
        style={{ alignSelf: "stretch" }}
      >
        <S.RightActionContainer>
          <Entypo name="check" size={40} color={theme.colors.WHITE} />
        </S.RightActionContainer>
      </TouchableOpacity>
    );
  };
  function getProductsDescription() {
    let description = "";
    if (gasAmount > 0) {
      description += `${gasAmount} Gás${gasAmount > 1 ? "es" : ""}`;
    }
    if (gasAmount > 0 && waterAmount > 0) {
      description += " e ";
    }
    if (waterAmount > 0) {
      description += `${waterAmount} Água${waterAmount > 1 ? "s" : ""}`;
    }
    return description;
  }

  const expirationDate = dayjs(updated_at).add(30, "day").format("DD/MM/YYYY");

  const isExpired = dayjs(dayjs().date()).isAfter(expirationDate);

  const productsDescription = getProductsDescription();

  return (
    <Swipeable
      renderLeftActions={leftAction ? leftSwipe : undefined}
      renderRightActions={rightAction ? rightSwipe : undefined}
      enabled={Boolean(rightAction || leftAction)}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      containerStyle={{
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <S.CardSurface onPress={onPress} disabled={!onPress}>
        <S.CardContent>
          <OrderStatusText status={status} />
          {isExpired && (
            <S.Badge>
              <CustomText
                color={theme.colors.WHITE}
                fontWeight={theme.font.weight.bold}
              >
                Vencido
              </CustomText>
            </S.Badge>
          )}
          <S.CardRowsContainer>
            <S.CardRowContainer>
              <S.CardText>Data do pedido</S.CardText>
              <S.CardText>
                {dayjs(updated_at).format("DD/MM/YYYY")}{" "}
                {dayjs(updated_at).format("HH:mm")}
              </S.CardText>
            </S.CardRowContainer>
            <S.Divider />
            <S.CardRowContainer>
              <S.CardText>Vencimento</S.CardText>
              <CustomText
                color={isExpired ? theme.colors.RED_100 : theme.colors.GRAY_600}
                fontWeight={theme.font.weight.extrabold}
              >
                {expirationDate}{" "}
              </CustomText>
            </S.CardRowContainer>
            <S.Divider />
            <S.CardRowContainer>
              <S.CardText>Descrição</S.CardText>
              <S.CardText>{productsDescription}</S.CardText>
              {showUserName && <S.CardText>{username}</S.CardText>}
            </S.CardRowContainer>
            <S.Divider />
            <S.CardRowContainer>
              <S.CardText>Valor</S.CardText>
              <S.CardText>{formatToBRL(total)}</S.CardText>
            </S.CardRowContainer>
          </S.CardRowsContainer>
        </S.CardContent>
      </S.CardSurface>
    </Swipeable>
  );
};
