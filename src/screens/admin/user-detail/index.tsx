import { Button } from "@components/button";
import { AccountCard } from "@components/account-card";
import { AccountTransactionHistory } from "@components/account-transaction-history";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import { ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { formatToBRL } from "src/helpers/format-currency";
import { AdminRoutes } from "src/routes/admin.routes";
import theme from "src/styles/theme";
import * as S from "./styles";
import { RegisterPaymentModal } from "./register-payment-modal";
import { useAdminUserDetail } from "./use-admin-user-detail";
import { useRegisterPayment } from "./use-register-payment";

type AdminUserDetailRouteParams = {
  userDetail: {
    userId: number;
  };
};

export function AdminUserDetailScreen() {
  const route = useRoute<RouteProp<AdminUserDetailRouteParams, "userDetail">>();
  const navigation = useNavigation<NativeStackNavigationProp<AdminRoutes>>();
  const { userId } = route.params;

  const {
    userDetail,
    userAccounts,
    transactions,
    isLoading,
    isLoadingAccounts,
    isLoadingTransactions,
    accountSort,
    setAccountSort,
    transactionSort,
    setTransactionSort,
    selectedAccountFilter,
    setSelectedAccountFilter,
    accountFilterOptions,
    accountSortOptions,
    transactionSortOptions,
    hasMoreTransactions,
    loadMoreTransactions,
    reloadUserDetailScreen,
  } = useAdminUserDetail(userId);

  const {
    isPaymentModalVisible,
    openPaymentModal,
    closePaymentModal,
    submitPayment,
    isSubmittingPayment,
    hasOpenAccounts,
    paymentAccountOptions,
    paymentMethodOptions,
    selectedPaymentAccountId,
    handlePaymentAccountChange,
    paymentAmountInput,
    setPaymentAmountInput,
    paymentMethod,
    setPaymentMethod,
    paymentNotes,
    setPaymentNotes,
  } = useRegisterPayment({
    userAccounts,
    onPaymentSuccess: reloadUserDetailScreen,
  });

  if (isLoading || !userDetail) {
    return (
      <LinearGradientBackground>
        <S.SafeAreaViewContainer>
          <StatusBar style="light" />
          <CustomHeader />
          <ActivityIndicator size="large" color={theme.colors.WHITE} />
        </S.SafeAreaViewContainer>
      </LinearGradientBackground>
    );
  }

  const paidAccountsCount = userAccounts.filter(
    (account) => account.payment_state === "PAGO"
  ).length;

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />
        <CustomHeader />
        <S.ScrollViewContainer>
          <S.ContentContainer>
            <S.SummaryCard>
              <S.SummaryTitle>{userDetail.username}</S.SummaryTitle>
              <S.RowContainer>
                <S.RowLabel>Saldo total em aberto</S.RowLabel>
                <S.OpenBalanceValue>
                  {formatToBRL(userDetail.accountSummary.openBalance)}
                </S.OpenBalanceValue>
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Contas em aberto</S.RowLabel>
                <S.RowValue>
                  {userDetail.accountSummary.openAccountsCount}
                </S.RowValue>
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Contas vencidas</S.RowLabel>
                <S.RowValue>
                  {userDetail.accountSummary.overdueAccountsCount}
                </S.RowValue>
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Contas quitadas</S.RowLabel>
                <S.RowValue>{paidAccountsCount}</S.RowValue>
              </S.RowContainer>
              {hasOpenAccounts && (
                <Button
                  title="Registrar pagamento"
                  onPress={openPaymentModal}
                />
              )}
            </S.SummaryCard>

            <S.SectionCard>
              <S.SectionTitleRow>
                <S.SectionAccent />
                <S.SectionTitle>Cliente</S.SectionTitle>
              </S.SectionTitleRow>
              <S.RowContainer>
                <S.RowLabel>E-mail</S.RowLabel>
                <S.RowValue>{userDetail.email}</S.RowValue>
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Telefone</S.RowLabel>
                <S.RowValue>{userDetail.telephone}</S.RowValue>
              </S.RowContainer>
              <S.RowContainer>
                <S.RowLabel>Cadastro</S.RowLabel>
                <S.RowValue>
                  {dayjs(userDetail.created_at).format("DD/MM/YYYY")}
                </S.RowValue>
              </S.RowContainer>
              {userDetail.addresses.map((address) => (
                <S.RowContainer key={address.id}>
                  <S.RowLabel>Endereço</S.RowLabel>
                  <S.RowValue>
                    {[address.local, address.street, address.number]
                      .filter(Boolean)
                      .join(", ")}
                  </S.RowValue>
                </S.RowContainer>
              ))}
            </S.SectionCard>

            <S.SectionCard>
              <S.SectionTitleRow>
                <S.SectionAccent />
                <S.SectionTitle>Contas</S.SectionTitle>
              </S.SectionTitleRow>
              <S.SortControlShell>
                <Dropdown
                  style={S.dropdownStyles.dropdown}
                  placeholderStyle={S.dropdownStyles.placeholder}
                  selectedTextStyle={S.dropdownStyles.selectedText}
                  iconStyle={S.dropdownStyles.icon}
                  containerStyle={S.dropdownStyles.menuContainer}
                  data={accountSortOptions}
                  maxHeight={220}
                  labelField="label"
                  valueField="value"
                  value={accountSort}
                  onChange={({ value }) => setAccountSort(value)}
                />
              </S.SortControlShell>
              {isLoadingAccounts ? (
                <ActivityIndicator size="small" color={theme.colors.ORANGE_300} />
              ) : (
                <S.AccountsList>
                  {userAccounts.map((account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      onPress={() =>
                        navigation.navigate("orderDetail", {
                          orderId: account.id,
                        })
                      }
                    />
                  ))}
                </S.AccountsList>
              )}
            </S.SectionCard>

            <S.SectionCard>
              <S.SectionTitleRow>
                <S.SectionAccent />
                <S.SectionTitle>Histórico de movimentações</S.SectionTitle>
              </S.SectionTitleRow>
              <S.SortControlShell>
                <Dropdown
                  style={S.dropdownStyles.dropdown}
                  placeholderStyle={S.dropdownStyles.placeholder}
                  selectedTextStyle={S.dropdownStyles.selectedText}
                  iconStyle={S.dropdownStyles.icon}
                  containerStyle={S.dropdownStyles.menuContainer}
                  data={accountFilterOptions}
                  maxHeight={220}
                  labelField="label"
                  valueField="value"
                  value={selectedAccountFilter}
                  onChange={({ value }) => setSelectedAccountFilter(value)}
                />
              </S.SortControlShell>
              <S.SortControlShell>
                <Dropdown
                  style={S.dropdownStyles.dropdown}
                  placeholderStyle={S.dropdownStyles.placeholder}
                  selectedTextStyle={S.dropdownStyles.selectedText}
                  iconStyle={S.dropdownStyles.icon}
                  containerStyle={S.dropdownStyles.menuContainer}
                  data={transactionSortOptions}
                  maxHeight={220}
                  labelField="label"
                  valueField="value"
                  value={transactionSort}
                  onChange={({ value }) => setTransactionSort(value)}
                />
              </S.SortControlShell>
              {isLoadingTransactions && transactions.length === 0 ? (
                <ActivityIndicator size="small" color={theme.colors.ORANGE_300} />
              ) : (
                <AccountTransactionHistory transactions={transactions} />
              )}
              {hasMoreTransactions && !isLoadingTransactions && (
                <S.LoadMoreButton onPress={loadMoreTransactions}>
                  <S.LoadMoreButtonText>
                    Carregar mais movimentações
                  </S.LoadMoreButtonText>
                </S.LoadMoreButton>
              )}
            </S.SectionCard>
          </S.ContentContainer>
        </S.ScrollViewContainer>
        <RegisterPaymentModal
          visible={isPaymentModalVisible}
          isSubmittingPayment={isSubmittingPayment}
          paymentAccountOptions={paymentAccountOptions}
          paymentMethodOptions={paymentMethodOptions}
          selectedPaymentAccountId={selectedPaymentAccountId}
          paymentAmountInput={paymentAmountInput}
          paymentMethod={paymentMethod}
          paymentNotes={paymentNotes}
          onClose={closePaymentModal}
          onSubmit={submitPayment}
          onPaymentAccountChange={handlePaymentAccountChange}
          onPaymentAmountChange={setPaymentAmountInput}
          onPaymentMethodChange={setPaymentMethod}
          onPaymentNotesChange={setPaymentNotes}
        />
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
