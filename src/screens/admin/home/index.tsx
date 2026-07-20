import { useAppSelector } from "@hooks/useAppSelector";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { formatTodayChipLabel } from "src/helpers/date";
import theme from "src/styles/theme";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import * as S from "./styles";
import { useAdminHome } from "./use-admin-home";

export function Home() {
  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const { dashboardData, formattedTotalRevenue, isLoading } = useAdminHome();

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

          <S.SubTitle>Como estão as vendas hoje?</S.SubTitle>

          <S.DateChip>
            <Feather name="calendar" size={14} color={theme.colors.WHITE} />
            <S.DateChipText>{todayChipLabel}</S.DateChipText>
          </S.DateChip>

          <S.AnalysisContainer>
            <S.HighlightCard>
              <S.CardHeader>
                <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                  <Feather
                    name="package"
                    size={14}
                    color={theme.colors.ORANGE_200}
                  />
                </S.IconBadge>
                <S.DataItem>Total de pedidos feitos pelo aplicativo</S.DataItem>
              </S.CardHeader>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>
                  {dashboardData.totalOrdersToday}
                </S.DataItemValue>
                <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.HighlightCard>

            <S.GasAndWaterAnalysisContainer>
              <S.SideBySideDataContainer>
                <S.CardHeader>
                  <S.IconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                    <Feather name="droplet" size={14} color={theme.colors.BLUE} />
                  </S.IconBadge>
                  <S.DataItem numberOfLines={2}>
                    Total de pedidos de água
                  </S.DataItem>
                </S.CardHeader>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>
                    {dashboardData.waterOrdersToday}
                  </S.DataItemValue>
                  <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
              <S.SideBySideDataContainer>
                <S.CardHeader>
                  <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                    <Feather
                      name="zap"
                      size={14}
                      color={theme.colors.ORANGE_100}
                    />
                  </S.IconBadge>
                  <S.DataItem numberOfLines={2}>
                    Total de pedidos de gás
                  </S.DataItem>
                </S.CardHeader>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>
                    {dashboardData.gasOrdersToday}
                  </S.DataItemValue>
                  <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
            </S.GasAndWaterAnalysisContainer>

            <S.GasAndWaterAnalysisContainer>
              <S.SideBySideDataContainer>
                <S.CardHeader>
                  <S.IconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                    <Feather name="box" size={14} color={theme.colors.BLUE} />
                  </S.IconBadge>
                  <S.DataItem numberOfLines={1}>Estoque de água</S.DataItem>
                </S.CardHeader>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>
                    {dashboardData.waterStockQuantity}
                  </S.DataItemValue>
                  <S.DataItemValueText>unidades</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
              <S.SideBySideDataContainer>
                <S.CardHeader>
                  <S.IconBadge backgroundColor={theme.colors.ORANGE_50}>
                    <Feather
                      name="box"
                      size={14}
                      color={theme.colors.ORANGE_100}
                    />
                  </S.IconBadge>
                  <S.DataItem numberOfLines={1}>Estoque de gás</S.DataItem>
                </S.CardHeader>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>
                    {dashboardData.gasStockQuantity}
                  </S.DataItemValue>
                  <S.DataItemValueText>unidades</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
            </S.GasAndWaterAnalysisContainer>

            <S.DataContainer>
              <S.CardHeader>
                <S.IconBadge backgroundColor="rgba(104, 211, 145, 0.2)">
                  <Feather
                    name="dollar-sign"
                    size={14}
                    color={theme.colors.GREEN}
                  />
                </S.IconBadge>
                <S.DataItem>Total apurado</S.DataItem>
              </S.CardHeader>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>{formattedTotalRevenue}</S.DataItemValue>
                <S.DataItemValueText>Reais</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.DataContainer>
          </S.AnalysisContainer>
        </S.ScrollViewContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
