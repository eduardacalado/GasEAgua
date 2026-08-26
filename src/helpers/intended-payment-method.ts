import theme from "src/styles/theme";
import { IntendedPaymentMethod } from "src/types/orders";

const intendedPaymentMethodLabels: Record<IntendedPaymentMethod, string> = {
  DINHEIRO: "Dinheiro",
  PIX: "Pix",
  CARTAO: "Cartão",
  TRANSFERENCIA: "Transferência",
};

export type IntendedPaymentMethodIconName =
  | "cash"
  | "qrcode"
  | "credit-card-outline";

export type IntendedPaymentMethodOption = {
  label: string;
  value: IntendedPaymentMethod;
  icon: IntendedPaymentMethodIconName;
  iconColor: string;
};

export const intendedPaymentMethodOptions: IntendedPaymentMethodOption[] = [
  {
    label: "Dinheiro",
    value: "DINHEIRO",
    icon: "cash",
    iconColor: theme.colors.GREEN,
  },
  { label: "Pix", value: "PIX", icon: "qrcode", iconColor: theme.colors.BLUE },
  {
    label: "Cartão",
    value: "CARTAO",
    icon: "credit-card-outline",
    iconColor: theme.colors.ORANGE_300,
  },
];

export function getIntendedPaymentMethodLabel(
  intendedPaymentMethod?: IntendedPaymentMethod | string | null
) {
  if (!intendedPaymentMethod) {
    return "Não informado";
  }

  const intendedPaymentMethodLabel =
    intendedPaymentMethodLabels[intendedPaymentMethod as IntendedPaymentMethod];

  if (intendedPaymentMethodLabel) {
    return intendedPaymentMethodLabel;
  }

  return intendedPaymentMethod;
}

export function getIntendedPaymentMethodOption(
  intendedPaymentMethod?: IntendedPaymentMethod | null
) {
  if (!intendedPaymentMethod) {
    return undefined;
  }

  return intendedPaymentMethodOptions.find(
    (option) => option.value === intendedPaymentMethod
  );
}
