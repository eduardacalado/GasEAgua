import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import dayjs from "dayjs";
import { formatToBRL } from "src/helpers/format-currency";
import theme from "src/styles/theme";
import { useRevenue } from "./use-revenue";
import * as S from "./styles";

export function RevenueScreen() {
  const {
    viewMode,
    startDate,
    endDate,
    openStartPicker,
    openEndPicker,
    metrics,
    isLoading,
    switchToToday,
    switchToRange,
    handleStartDateChange,
    handleEndDateChange,
    toggleStartPicker,
    toggleEndPicker,
  } = useRevenue();

  const waterQuantity = metrics.itemsByType["WATER"] ?? 0;
  const gasQuantity = metrics.itemsByType["GAS"] ?? 0;

  return (
    <LinearGradientBackground>
      <S.Container>
        <StatusBar style="light" />
        <CustomHeader />

        <S.ScrollContainer>
          <S.Title>Faturamento</S.Title>

          <S.ChipsRow>
            <S.Chip
              active={viewMode === "today"}
              onPress={switchToToday}
              activeOpacity={0.7}
            >
              <S.ChipText active={viewMode === "today"}>Hoje</S.ChipText>
            </S.Chip>
            <S.Chip
              active={viewMode === "range"}
              onPress={switchToRange}
              activeOpacity={0.7}
            >
              <S.ChipText active={viewMode === "range"}>Período</S.ChipText>
            </S.Chip>
          </S.ChipsRow>

          {viewMode === "range" && (
            <S.DateRangeRow>
              <S.DateButton onPress={toggleStartPicker} activeOpacity={0.7}>
                <Feather name="calendar" size={14} color={theme.colors.WHITE} />
                <S.DateButtonText>
                  {dayjs(startDate).format("DD/MM/YYYY")}
                </S.DateButtonText>
              </S.DateButton>
              <S.DateButton onPress={toggleEndPicker} activeOpacity={0.7}>
                <Feather name="calendar" size={14} color={theme.colors.WHITE} />
                <S.DateButtonText>
                  {dayjs(endDate).format("DD/MM/YYYY")}
                </S.DateButtonText>
              </S.DateButton>
            </S.DateRangeRow>
          )}

          {openStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
              maximumDate={new Date()}
            />
          )}

          {openEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
              minimumDate={startDate}
              maximumDate={new Date()}
            />
          )}

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={{ marginTop: 40 }}
            />
          ) : (
            <S.CardsContainer>
              <S.HighlightCard>
                <S.CardHeader>
                  <S.IconBadge backgroundColor="rgba(104, 211, 145, 0.2)">
                    <Feather
                      name="dollar-sign"
                      size={14}
                      color={theme.colors.GREEN}
                    />
                  </S.IconBadge>
                  <S.CardLabel>Recebido</S.CardLabel>
                </S.CardHeader>
                <S.CardValue>{formatToBRL(metrics.paidRevenue)}</S.CardValue>
                <S.CardUnit>Reais</S.CardUnit>
              </S.HighlightCard>

              <S.DataCard>
                <S.CardHeader>
                  <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                    <Feather
                      name="clock"
                      size={14}
                      color={theme.colors.ORANGE_200}
                    />
                  </S.IconBadge>
                  <S.CardLabel>Em aberto</S.CardLabel>
                </S.CardHeader>
                <S.CardValueSmall>
                  {formatToBRL(metrics.pendingRevenue)}
                </S.CardValueSmall>
                <S.CardUnit>Reais</S.CardUnit>
              </S.DataCard>

              <S.DataCard>
                <S.CardHeader>
                  <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                    <Feather
                      name="package"
                      size={14}
                      color={theme.colors.ORANGE_200}
                    />
                  </S.IconBadge>
                  <S.CardLabel>Total de pedidos</S.CardLabel>
                </S.CardHeader>
                <S.CardValueSmall>{metrics.ordersCount}</S.CardValueSmall>
                <S.CardUnit>pedidos no período</S.CardUnit>
              </S.DataCard>

              <S.SideBySideRow>
                <S.SideBySideCard>
                  <S.CardHeader>
                    <S.IconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                      <Feather
                        name="droplet"
                        size={14}
                        color={theme.colors.BLUE}
                      />
                    </S.IconBadge>
                    <S.CardLabel>Água</S.CardLabel>
                  </S.CardHeader>
                  <S.CardValueSmall>{waterQuantity}</S.CardValueSmall>
                  <S.CardUnit>unidades</S.CardUnit>
                </S.SideBySideCard>

                <S.SideBySideCard>
                  <S.CardHeader>
                    <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                      <Feather
                        name="zap"
                        size={14}
                        color={theme.colors.ORANGE_100}
                      />
                    </S.IconBadge>
                    <S.CardLabel>Gás</S.CardLabel>
                  </S.CardHeader>
                  <S.CardValueSmall>{gasQuantity}</S.CardValueSmall>
                  <S.CardUnit>unidades</S.CardUnit>
                </S.SideBySideCard>
              </S.SideBySideRow>
            </S.CardsContainer>
          )}
        </S.ScrollContainer>
      </S.Container>
    </LinearGradientBackground>
  );
}
