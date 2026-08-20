import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { usePaymentSettings } from "src/hooks/use-payment-settings";
import theme from "src/styles/theme";
import { OrderDetailProps } from "src/types/orders";
import * as S from "../styles";
import { ActivityIndicator, Pressable } from "react-native";

type OrderDetailPixPaymentSectionProps = {
  orderDetail: OrderDetailProps;
};

function SectionHeader() {
  return (
    <S.SectionTitleRow>
      <S.SectionAccent />
      <Feather name="smartphone" size={18} color={theme.colors.GRAY_300} />
      <S.SectionTitle>O pagamento pode ser feito através da chave Pix</S.SectionTitle>
    </S.SectionTitleRow>
  );
}

export function OrderDetailPixPaymentSection({
  orderDetail,
}: OrderDetailPixPaymentSectionProps) {
  const { paymentSettings, isLoading } = usePaymentSettings();

  const shouldShowPixInstructions = orderDetail.payment_state !== "PAGO";

  if (!shouldShowPixInstructions) {
    return null;
  }

  if (isLoading) {
    return (
      <S.SectionCard>
        <SectionHeader />
        <ActivityIndicator size="small" color={theme.colors.ORANGE_200} />
      </S.SectionCard>
    );
  }

  if (!paymentSettings?.pix_key?.trim()) {
    return null;
  }

  const handleCopyPixKey = async () => {
    await Clipboard.setStringAsync(paymentSettings.pix_key);
    Toast.show({
      type: "success",
      text1: "Chave Pix copiada",
    });
  };

  return (
    <S.SectionCard>
      <SectionHeader />

      {paymentSettings.recipient_name.trim().length > 0 && (
        <S.ListRow>
          <S.RowLabel>Recebedor</S.RowLabel>
          <S.RowValue>{paymentSettings.recipient_name}</S.RowValue>
        </S.ListRow>
      )}

      <S.ListRow>
        <S.RowLabel>Chave Pix</S.RowLabel>
        <S.RowValue>{paymentSettings.pix_key}</S.RowValue>
      </S.ListRow>

      <Pressable onPress={handleCopyPixKey}>
        <S.PixCopyButton>
          <Feather name="copy" size={16} color={theme.colors.WHITE} />
          <S.PixCopyButtonText>Copiar chave Pix</S.PixCopyButtonText>
        </S.PixCopyButton>
      </Pressable>
    </S.SectionCard>
  );
}
