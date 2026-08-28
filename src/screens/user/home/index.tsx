import { HelpHeaderButton } from "@components/help-header-button";
import { useAppSelector } from "@hooks/useAppSelector";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { ActivityIndicator } from "react-native";
import theme from "src/styles/theme";
import { ProductName } from "src/types/stock";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { UserNavigatorRoutesProps } from "../../../routes/user.routes";
import * as S from "./styles";
import { useHome } from "./use-home";

const HOW_IT_WORKS_ITEMS = [
  {
    icon: "truck" as const,
    title: "Pediu, entregamos",
    description: "Receba gás e água no seu endereço",
    badgeColor: theme.colors.ORANGE_50,
    iconColor: theme.colors.ORANGE_200,
  },
  {
    icon: "credit-card" as const,
    title: "Pix, dinheiro ou cartão",
    description: "Pague como preferir na entrega",
    badgeColor: "rgba(104, 211, 145, 0.2)",
    iconColor: theme.colors.GREEN,
  },
  {
    icon: "map-pin" as const,
    title: "Acompanhe o pedido",
    description: "Veja o status na aba Pedidos",
    badgeColor: "rgba(66, 153, 225, 0.15)",
    iconColor: theme.colors.BLUE,
  },
];

export function Home() {
  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const {
    openAccounts,
    openAccountsCountLabel,
    overdueAccountsCountLabel,
    formattedOpenBalance,
    remainingOpenAccountsCount,
    isLoadingOpenAccounts,
    hasOpenAccounts,
    hasOverdueAccounts,
  } = useHome();

  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const formattedName = name?.split(" ")?.[0];

  let remainingOpenAccountsLabel = `e mais ${remainingOpenAccountsCount} contas`;
  if (remainingOpenAccountsCount === 1) {
    remainingOpenAccountsLabel = "e mais 1 conta";
  }

  const handlePressOrder = (type: ProductName) => {
    navigation.navigate("userCreateOrder", {
      type,
    });
  };

  const handlePressOpenAccount = (orderId: number) => {
    navigation.navigate("orderDetail", {
      orderId,
    });
  };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.ScrollViewContainer>
          <S.HeaderContent>
            <S.HeaderRow>
              <S.Title>Olá, {formattedName}!</S.Title>
              <HelpHeaderButton />
            </S.HeaderRow>
            <S.SubTitle>O que gostaria de pedir?</S.SubTitle>
          </S.HeaderContent>

          <S.OrderCardsContainer>
            <S.OrderCard
              activeOpacity={0.7}
              onPress={() => handlePressOrder("GAS")}
            >
              <S.OrderCardImage
                source={require("../../../../assets/images/gasLogo.png")}
                placeholder={{ blurhash }}
                contentFit="contain"
                transition={1000}
              />
              <S.OrderCardTextGroup>
                <S.OrderCardTitle>Pedir Gás</S.OrderCardTitle>
                <S.OrderCardDescription>
                  Botijão para entrega
                </S.OrderCardDescription>
              </S.OrderCardTextGroup>
              <Feather
                name="chevron-right"
                size={22}
                color={theme.colors.GRAY_300}
              />
            </S.OrderCard>

            <S.OrderCard
              activeOpacity={0.7}
              onPress={() => handlePressOrder("WATER")}
            >
              <S.OrderCardImage
                source={require("../../../../assets/images/aguaLogo.png")}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
              <S.OrderCardTextGroup>
                <S.OrderCardTitle>Pedir Água</S.OrderCardTitle>
                <S.OrderCardDescription>
                  Galão para entrega
                </S.OrderCardDescription>
              </S.OrderCardTextGroup>
              <Feather
                name="chevron-right"
                size={22}
                color={theme.colors.GRAY_300}
              />
            </S.OrderCard>
          </S.OrderCardsContainer>

          <S.SectionCard>
            <S.SectionTitle>Contas em aberto</S.SectionTitle>
            {isLoadingOpenAccounts && (
              <S.OpenAccountsLoadingContainer>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.ORANGE_200}
                />
              </S.OpenAccountsLoadingContainer>
            )}
            {!isLoadingOpenAccounts && !hasOpenAccounts && (
              <S.EmptyOpenAccountsRow>
                <S.IconBadge backgroundColor="#E8F8EE">
                  <Feather
                    name="check-circle"
                    size={18}
                    color={theme.colors.GREEN}
                  />
                </S.IconBadge>
                <S.EmptyOpenAccountsText>
                  Você não tem nada em aberto.
                </S.EmptyOpenAccountsText>
              </S.EmptyOpenAccountsRow>
            )}
            {!isLoadingOpenAccounts && hasOpenAccounts && (
                <>
                  <S.OpenAccountsSummary>
                    <S.OpenAccountsCountText>
                      {openAccountsCountLabel}
                    </S.OpenAccountsCountText>
                    <S.OpenAccountsBalance>
                      {formattedOpenBalance}
                    </S.OpenAccountsBalance>
                    {hasOverdueAccounts && (
                      <S.OpenAccountsHint>
                        {overdueAccountsCountLabel}
                      </S.OpenAccountsHint>
                    )}
                  </S.OpenAccountsSummary>

                  {openAccounts.map((openAccount, index) => {
                    const isLastItem = index === openAccounts.length - 1;

                    return (
                      <Fragment key={openAccount.id}>
                        <S.OpenAccountButton
                          activeOpacity={0.7}
                          onPress={() => handlePressOpenAccount(openAccount.id)}
                        >
                          <S.IconBadge
                            backgroundColor={
                              openAccount.paymentStateSurfaceColor
                            }
                          >
                            <Feather
                              name={openAccount.paymentStateIconName}
                              size={16}
                              color={openAccount.paymentStateColor}
                            />
                          </S.IconBadge>
                          <S.OpenAccountTextGroup>
                            <S.OpenAccountTitle>
                              {openAccount.identifierLabel}
                            </S.OpenAccountTitle>
                            <S.OpenAccountMeta
                              color={openAccount.paymentStateColor}
                            >
                              {openAccount.paymentStateLabel}
                            </S.OpenAccountMeta>
                          </S.OpenAccountTextGroup>
                          <S.OpenAccountTotal>
                            {openAccount.formattedBalance}
                          </S.OpenAccountTotal>
                          <Feather
                            name="chevron-right"
                            size={18}
                            color={theme.colors.GRAY_300}
                          />
                        </S.OpenAccountButton>
                        {!isLastItem && <S.Divider />}
                      </Fragment>
                    );
                  })}

                  {remainingOpenAccountsCount > 0 && (
                    <S.RemainingOpenAccountsText>
                      {remainingOpenAccountsLabel}
                    </S.RemainingOpenAccountsText>
                  )}
                </>
              )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionTitle>Como funciona</S.SectionTitle>
            {HOW_IT_WORKS_ITEMS.map((item, index) => {
              const isLastItem = index === HOW_IT_WORKS_ITEMS.length - 1;

              return (
                <Fragment key={item.title}>
                  <S.InfoRow>
                    <S.IconBadge backgroundColor={item.badgeColor}>
                      <Feather
                        name={item.icon}
                        size={18}
                        color={item.iconColor}
                      />
                    </S.IconBadge>
                    <S.InfoTextGroup>
                      <S.InfoTitle>{item.title}</S.InfoTitle>
                      <S.InfoDescription>{item.description}</S.InfoDescription>
                    </S.InfoTextGroup>
                  </S.InfoRow>
                  {!isLastItem && <S.Divider />}
                </Fragment>
              );
            })}
          </S.SectionCard>
        </S.ScrollViewContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
