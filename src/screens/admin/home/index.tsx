import { useAppSelector } from "@hooks/useAppSelector";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { useAdminHome } from "./use-admin-home";
import * as S from "./styles";

export function Home() {
  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const { dashboardData, formattedTotalRevenue, isLoading } = useAdminHome();

  const formattedName = name?.split(" ")?.[0];

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

          <S.AnalysisContainer>
            <S.DataContainer>
              <S.DataItem>Total de pedidos feitos pelo aplicativo</S.DataItem>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>{dashboardData.totalOrdersToday}</S.DataItemValue>
                <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.DataContainer>
            <S.GasAndWaterAnalysisContainer>
              <S.SideBySideDataContainer>
                <S.DataItem>Total de pedidos de água</S.DataItem>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>{dashboardData.waterOrdersToday}</S.DataItemValue>
                  <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
              <S.SideBySideDataContainer>
                <S.DataItem>Total de pedidos de gás</S.DataItem>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>{dashboardData.gasOrdersToday}</S.DataItemValue>
                  <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
            </S.GasAndWaterAnalysisContainer>
            <S.GasAndWaterAnalysisContainer>
              <S.SideBySideDataContainer>
                <S.DataItem>Estoque de água</S.DataItem>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>{dashboardData.waterStockQuantity}</S.DataItemValue>
                  <S.DataItemValueText>unidades</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
              <S.SideBySideDataContainer>
                <S.DataItem>Estoque de gás</S.DataItem>
                <S.DataItemValueTextContainer>
                  <S.DataItemValue>{dashboardData.gasStockQuantity}</S.DataItemValue>
                  <S.DataItemValueText>unidades</S.DataItemValueText>
                </S.DataItemValueTextContainer>
              </S.SideBySideDataContainer>
            </S.GasAndWaterAnalysisContainer>
            <S.DataContainer>
              <S.DataItem>Total apurado</S.DataItem>
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
