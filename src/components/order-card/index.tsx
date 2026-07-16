import { CustomText } from "@components/custom-text";
import { OrderStatusText } from "@components/order-status-text";
import { Entypo, Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { formatToBRL } from "src/helpers/format-currency";
import {
  getOrderStatusColor,
  getOrderStatusIconName,
  getOrderStatusSurfaceColor,
} from "src/helpers/order-status";
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

const ROW_ICON_BADGE_COLOR = theme.colors.GRAY_100;
const ROW_ICON_COLOR = theme.colors.GRAY_300;

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
  const statusColor = getOrderStatusColor(status);
  const statusSurfaceColor = getOrderStatusSurfaceColor(status);
  const statusIconName = getOrderStatusIconName(status);

  return (
    <Swipeable
      renderLeftActions={leftAction ? leftSwipe : undefined}
      renderRightActions={rightAction ? rightSwipe : undefined}
      enabled={Boolean(rightAction || leftAction)}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      containerStyle={{
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <S.CardSurface onPress={onPress} disabled={!onPress}>
        <S.CardContent>
          <S.StatusHeader>
            <S.IconBadge backgroundColor={statusSurfaceColor}>
              <Feather name={statusIconName} size={14} color={statusColor} />
            </S.IconBadge>
            <OrderStatusText status={status} />
          </S.StatusHeader>
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
              <S.LabelGroup>
                <S.IconBadge backgroundColor={ROW_ICON_BADGE_COLOR}>
                  <Feather name="calendar" size={14} color={ROW_ICON_COLOR} />
                </S.IconBadge>
                <S.CardLabel>Data do pedido</S.CardLabel>
              </S.LabelGroup>
              <S.CardValue>
                {dayjs(updated_at).format("DD/MM/YYYY")}{" "}
                {dayjs(updated_at).format("HH:mm")}
              </S.CardValue>
            </S.CardRowContainer>

            <S.Divider />

            <S.CardRowContainer>
              <S.LabelGroup>
                <S.IconBadge backgroundColor={ROW_ICON_BADGE_COLOR}>
                  <Feather name="clock" size={14} color={ROW_ICON_COLOR} />
                </S.IconBadge>
                <S.CardLabel>Vencimento</S.CardLabel>
              </S.LabelGroup>
              <S.CardValue
                style={{
                  color: isExpired
                    ? theme.colors.RED_100
                    : theme.colors.GRAY_700,
                }}
              >
                {expirationDate}
              </S.CardValue>
            </S.CardRowContainer>

            <S.Divider />

            <S.CardRowContainer>
              <S.LabelGroup>
                <S.IconBadge backgroundColor={ROW_ICON_BADGE_COLOR}>
                  <Feather name="package" size={14} color={ROW_ICON_COLOR} />
                </S.IconBadge>
                <S.CardLabel>Descrição</S.CardLabel>
              </S.LabelGroup>
              <S.ValueGroup>
                {!!productsDescription && (
                  <S.CardValue>{productsDescription}</S.CardValue>
                )}
                {showUserName && !!username && (
                  <S.CardValue>{username}</S.CardValue>
                )}
              </S.ValueGroup>
            </S.CardRowContainer>

            <S.Divider />

            <S.CardRowContainer>
              <S.LabelGroup>
                <S.IconBadge backgroundColor={ROW_ICON_BADGE_COLOR}>
                  <Feather
                    name="dollar-sign"
                    size={14}
                    color={ROW_ICON_COLOR}
                  />
                </S.IconBadge>
                <S.CardLabel>Valor</S.CardLabel>
              </S.LabelGroup>
              <S.CardValue>{formatToBRL(total)}</S.CardValue>
            </S.CardRowContainer>
          </S.CardRowsContainer>
        </S.CardContent>
      </S.CardSurface>
    </Swipeable>
  );
};
