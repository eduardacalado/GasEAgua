import { HelpHeaderButton } from "@components/help-header-button";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AdminNavigatorRoutesProps } from "src/routes/admin.routes";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { getStockAlertBannerMessage } from "src/helpers/stock-quantity";
import theme from "src/styles/theme";
import { useManagementHub } from "./use-management-hub";
import * as S from "./styles";

export function ManagementHubScreen() {
  const navigation = useNavigation<AdminNavigatorRoutesProps>();
  const { hasStockAlert, stockAlertItems, isLoading } = useManagementHub();
  const stockAlertBannerMessage = getStockAlertBannerMessage(stockAlertItems);

  if (isLoading) {
    return (
      <LinearGradientBackground>
        <S.SafeAreaContainer>
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="#FFFFFF" />
        </S.SafeAreaContainer>
      </LinearGradientBackground>
    );
  }

  return (
    <LinearGradientBackground>
      <S.SafeAreaContainer>
        <StatusBar style="light" />
        <S.ScrollContainer>
          <S.HeaderRow>
            <S.Title>Gestão</S.Title>
            <HelpHeaderButton />
          </S.HeaderRow>

          {hasStockAlert && (
            <S.LowStockBanner>
              <Feather name="alert-triangle" size={18} color={theme.colors.WHITE} />
              <S.LowStockBannerText>{stockAlertBannerMessage}</S.LowStockBannerText>
            </S.LowStockBanner>
          )}

          <S.CardsContainer>
            <S.MenuCard
              activeOpacity={0.7}
              onPress={() => navigation.navigate("stockAndPrices")}
            >
              <S.MenuCardHeader>
                <S.MenuCardIconBadge backgroundColor={theme.colors.ORANGE_50}>
                  <Feather name="box" size={20} color={theme.colors.ORANGE_200} />
                </S.MenuCardIconBadge>
                <S.MenuCardTitle>Estoque e Preços</S.MenuCardTitle>
                {hasStockAlert && (
                  <S.LowStockBadge>
                    <S.LowStockBadgeText>
                      {stockAlertItems.length}
                    </S.LowStockBadgeText>
                  </S.LowStockBadge>
                )}
              </S.MenuCardHeader>
              <S.MenuCardDescription>
                Gerenciar quantidades e valores dos produtos
              </S.MenuCardDescription>
            </S.MenuCard>

            <S.MenuCard
              activeOpacity={0.7}
              onPress={() => navigation.navigate("pixSettings")}
            >
              <S.MenuCardHeader>
                <S.MenuCardIconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                  <Feather name="smartphone" size={20} color={theme.colors.BLUE} />
                </S.MenuCardIconBadge>
                <S.MenuCardTitle>Pagamento Pix</S.MenuCardTitle>
              </S.MenuCardHeader>
              <S.MenuCardDescription>
                Cadastrar chave Pix e nome do recebedor
              </S.MenuCardDescription>
            </S.MenuCard>

            <S.MenuCard
              activeOpacity={0.7}
              onPress={() => navigation.navigate("revenue")}
            >
              <S.MenuCardHeader>
                <S.MenuCardIconBadge backgroundColor="rgba(104, 211, 145, 0.2)">
                  <Feather name="dollar-sign" size={20} color={theme.colors.GREEN} />
                </S.MenuCardIconBadge>
                <S.MenuCardTitle>Faturamento</S.MenuCardTitle>
              </S.MenuCardHeader>
              <S.MenuCardDescription>
                Receita por dia ou período
              </S.MenuCardDescription>
            </S.MenuCard>

            <S.MenuCard
              activeOpacity={0.7}
              onPress={() => navigation.navigate("broadcastNotification")}
            >
              <S.MenuCardHeader>
                <S.MenuCardIconBadge backgroundColor="rgba(66, 153, 225, 0.15)">
                  <Feather name="bell" size={20} color={theme.colors.BLUE} />
                </S.MenuCardIconBadge>
                <S.MenuCardTitle>Avisar clientes</S.MenuCardTitle>
              </S.MenuCardHeader>
              <S.MenuCardDescription>
                Enviar notificação para todos os clientes
              </S.MenuCardDescription>
            </S.MenuCard>
          </S.CardsContainer>
        </S.ScrollContainer>
      </S.SafeAreaContainer>
    </LinearGradientBackground>
  );
}
