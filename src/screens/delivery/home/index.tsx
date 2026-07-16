import { useAppSelector } from "@hooks/useAppSelector";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import * as S from "./styles";
import { useDeliveryHome } from "./use-delivery-home";

export function DeliveryHomeScreen() {
  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const { summaryData, isLoading } = useDeliveryHome();

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

          <S.SubTitle>Resumo das entregas de hoje</S.SubTitle>

          <S.CardsContainer>
            <S.DataCard>
              <S.DataLabel>Total de pedidos hoje</S.DataLabel>
              <S.DataValueRow>
                <S.DataValue>{summaryData.totalOrdersToday}</S.DataValue>
                <S.DataValueDescription>pedidos</S.DataValueDescription>
              </S.DataValueRow>
            </S.DataCard>

            <S.SideBySideContainer>
              <S.SideBySideCard>
                <S.DataLabel>Pendentes</S.DataLabel>
                <S.DataValueRow>
                  <S.DataValue>{summaryData.pendingCount}</S.DataValue>
                  <S.DataValueDescription>aguardando</S.DataValueDescription>
                </S.DataValueRow>
              </S.SideBySideCard>
              <S.SideBySideCard>
                <S.DataLabel>Em andamento</S.DataLabel>
                <S.DataValueRow>
                  <S.DataValue>{summaryData.inProgressCount}</S.DataValue>
                  <S.DataValueDescription>em entrega</S.DataValueDescription>
                </S.DataValueRow>
              </S.SideBySideCard>
            </S.SideBySideContainer>

            <S.DataCard>
              <S.DataLabel>Finalizados</S.DataLabel>
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
