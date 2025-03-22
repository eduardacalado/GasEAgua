export function formatToBRL(value?: number | string): string {
  if (!value) return "";

  const numberValue = Number(value);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(numberValue);
}
