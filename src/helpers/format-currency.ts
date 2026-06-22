export function formatToBRL(value?: number | string): string {
  const numberValue =
    value === undefined || value === null || value === ""
      ? 0
      : Number(value);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number.isNaN(numberValue) ? 0 : numberValue);
}
