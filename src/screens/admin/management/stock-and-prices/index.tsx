import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Modal, Pressable, RefreshControl } from "react-native";
import { formatToBRL } from "src/helpers/format-currency";
import { getStockQuantityAlertLabel } from "src/helpers/stock-quantity";
import theme from "src/styles/theme";
import { useStockAndPrices } from "./use-stock-and-prices";
import * as S from "./styles";

function getModalTitle(kind: string | undefined): string {
  if (kind === "stockQuantity") return "Definir quantidade";
  if (kind === "stockPrice") return "Alterar preço";
  if (kind === "addonPrice") return "Alterar preço do adicional";
  return "";
}

function getModalPlaceholder(kind: string | undefined): string {
  if (kind === "stockQuantity") return "Quantidade em estoque";
  return "Novo valor (R$)";
}

export function StockAndPricesScreen() {
  const {
    stockItems,
    addonItems,
    isLoading,
    refreshing,
    handleRefresh,
    modalTarget,
    modalInputValue,
    setModalInputValue,
    isSubmitting,
    openSetQuantityModal,
    openStockPriceModal,
    openAddonPriceModal,
    closeModal,
    handleSubmitModal,
  } = useStockAndPrices();

  if (isLoading) {
    return (
      <LinearGradientBackground>
        <S.Container>
          <StatusBar style="light" />
          <CustomHeader />
          <ActivityIndicator size="large" color="#FFFFFF" />
        </S.Container>
      </LinearGradientBackground>
    );
  }

  return (
    <LinearGradientBackground>
      <S.Container>
        <StatusBar style="light" />
        <CustomHeader />

        <S.ScrollContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#FFFFFF"
              colors={["#FFFFFF"]}
            />
          }
        >
          <S.Title>Estoque e Preços</S.Title>

          <S.SectionTitle>Produtos</S.SectionTitle>
          {stockItems.map((item) => {
            const stockQuantityAlertLabel = getStockQuantityAlertLabel(
              item.quantity
            );

            return (
            <S.ProductCard key={item.id}>
              <S.ProductHeader>
                <S.ProductName>{item.name}</S.ProductName>
                {stockQuantityAlertLabel && (
                  <S.LowStockBadge>
                    <S.LowStockBadgeText>
                      {stockQuantityAlertLabel}
                    </S.LowStockBadgeText>
                  </S.LowStockBadge>
                )}
              </S.ProductHeader>

              <S.ProductInfoRow>
                <S.ProductInfoLabel>Quantidade</S.ProductInfoLabel>
                <S.ProductInfoValue>{item.quantity} un.</S.ProductInfoValue>
              </S.ProductInfoRow>

              <S.ProductInfoRow>
                <S.ProductInfoLabel>Preço unitário</S.ProductInfoLabel>
                <S.ProductInfoValue>{formatToBRL(item.value)}</S.ProductInfoValue>
              </S.ProductInfoRow>

              <S.ActionsRow>
                <S.ActionButton
                  activeOpacity={0.7}
                  onPress={() => openSetQuantityModal(item)}
                >
                  <Feather name="plus" size={14} color={theme.colors.GRAY_700} />
                  <S.ActionButtonText>Definir qtd.</S.ActionButtonText>
                </S.ActionButton>
                <S.ActionButton
                  activeOpacity={0.7}
                  onPress={() => openStockPriceModal(item)}
                >
                  <Feather name="edit-2" size={14} color={theme.colors.GRAY_700} />
                  <S.ActionButtonText>Alterar preço</S.ActionButtonText>
                </S.ActionButton>
              </S.ActionsRow>
            </S.ProductCard>
            );
          })}

          {addonItems.length > 0 && (
            <>
              <S.SectionTitleOnLightBackground>Adicionais</S.SectionTitleOnLightBackground>
              {addonItems.map((addon) => (
                <S.ProductCard key={addon.id}>
                  <S.ProductHeader>
                    <S.ProductName>{addon.name}</S.ProductName>
                  </S.ProductHeader>

                  <S.ProductInfoRow>
                    <S.ProductInfoLabel>Preço unitário</S.ProductInfoLabel>
                    <S.ProductInfoValue>{formatToBRL(addon.value)}</S.ProductInfoValue>
                  </S.ProductInfoRow>

                  <S.ActionsRow>
                    <S.ActionButton
                      activeOpacity={0.7}
                      onPress={() => openAddonPriceModal(addon)}
                    >
                      <Feather name="edit-2" size={14} color={theme.colors.GRAY_700} />
                      <S.ActionButtonText>Alterar preço</S.ActionButtonText>
                    </S.ActionButton>
                  </S.ActionsRow>
                </S.ProductCard>
              ))}
            </>
          )}
        </S.ScrollContainer>

        <Modal
          visible={!!modalTarget}
          transparent
          animationType="slide"
          onRequestClose={closeModal}
        >
          <S.ModalOverlay>
            <Pressable style={{ flex: 1 }} onPress={closeModal} />
            <S.ModalContent>
              <S.ModalTitle>{getModalTitle(modalTarget?.kind)}</S.ModalTitle>
              <S.ModalSubtitle>
                {modalTarget?.kind === "stockQuantity"
                  ? `${modalTarget.name} — estoque atual: ${modalTarget.currentValue} un.`
                  : `${modalTarget?.name} — valor atual: ${formatToBRL(modalTarget?.currentValue ?? 0)}`}
              </S.ModalSubtitle>

              <S.ModalInput
                value={modalInputValue}
                onChangeText={setModalInputValue}
                keyboardType="numeric"
                placeholder={getModalPlaceholder(modalTarget?.kind)}
                placeholderTextColor={theme.colors.GRAY_300}
                autoFocus
              />

              <S.ModalButtonsRow>
                <Button
                  variant="secondary"
                  title="Cancelar"
                  onPress={closeModal}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Confirmar"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  onPress={handleSubmitModal}
                  style={{ flex: 1 }}
                />
              </S.ModalButtonsRow>
            </S.ModalContent>
          </S.ModalOverlay>
        </Modal>
      </S.Container>
    </LinearGradientBackground>
  );
}
