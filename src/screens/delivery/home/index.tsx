import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { useAppSelector } from "@hooks/useAppSelector";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { formatTodayChipLabel } from "src/helpers/date";
import theme from "src/styles/theme";
import * as S from "./styles";
import { useDeliveryHome } from "./use-delivery-home";

export function DeliveryHomeScreen() {
  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const { summaryData, isLoading } = useDeliveryHome();

  const formattedName = name?.split(" ")?.[0];
  const todayChipLabel = formatTodayChipLabel();

  if (isLoading) {
    return (
      <LinearGradientBackground>
        <S.SafeAreaViewContainer>
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="#FFFFFF" />
        </S.SafeAreaViewContainer>
      </LinearGradientBackground>
    );
  }

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.ScrollViewContainer>
          <S.Title>Olá, {formattedName}!</S.Title>

          <S.SubTitle>Resumo das entregas de hoje</S.SubTitle>

          <S.DateChip>
            <Feather name="calendar" size={14} color={theme.colors.WHITE} />
            <S.DateChipText>{todayChipLabel}</S.DateChipText>
          </S.DateChip>

          <S.CardsContainer>
            <S.HighlightCard>
              <S.CardHeader>
                <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                  <Feather
                    name="package"
                    size={14}
                    color={theme.colors.ORANGE_200}
                  />
                </S.IconBadge>
                <S.DataLabel>Total de pedidos hoje</S.DataLabel>
              </S.CardHeader>
              <S.DataValueRow>
                <S.DataValue>{summaryData.totalOrdersToday}</S.DataValue>
                <S.DataValueDescription>pedidos</S.DataValueDescription>
              </S.DataValueRow>
            </S.HighlightCard>

            <S.SideBySideContainer>
              <S.SideBySideCard>
                <S.CardHeader>
                  <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                    <Feather
                      name="clock"
                      size={14}
                      color={theme.colors.ORANGE_100}
                    />
                  </S.IconBadge>
                  <S.DataLabel numberOfLines={1}>Pendentes</S.DataLabel>
                </S.CardHeader>
                <S.DataValueRow>
                  <S.DataValue>{summaryData.pendingCount}</S.DataValue>
                  <S.DataValueDescription>aguardando</S.DataValueDescription>
                </S.DataValueRow>
              </S.SideBySideCard>

              <S.SideBySideCard>
                <S.CardHeader>
                  <S.IconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                    <Feather name="truck" size={14} color={theme.colors.BLUE} />
                  </S.IconBadge>
                  <S.DataLabel numberOfLines={1}>Em andamento</S.DataLabel>
                </S.CardHeader>
                <S.DataValueRow>
                  <S.DataValue>{summaryData.inProgressCount}</S.DataValue>
                  <S.DataValueDescription>em entrega</S.DataValueDescription>
                </S.DataValueRow>
              </S.SideBySideCard>
            </S.SideBySideContainer>

            <S.DataCard>
              <S.CardHeader>
                <S.IconBadge backgroundColor="rgba(104, 211, 145, 0.2)">
                  <Feather
                    name="check-circle"
                    size={14}
                    color={theme.colors.GREEN}
                  />
                </S.IconBadge>
                <S.DataLabel>Finalizados</S.DataLabel>
              </S.CardHeader>
              <S.DataValueRow>
                <S.DataValue>{summaryData.completedCount}</S.DataValue>
                <S.DataValueDescription>entregues hoje</S.DataValueDescription>
              </S.DataValueRow>
            </S.DataCard>
          </S.CardsContainer>
        </S.ScrollViewContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
