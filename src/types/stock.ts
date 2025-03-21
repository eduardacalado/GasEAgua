export type ProductName = "GAS" | "WATER";

export type ProductProps = {
  id: number;
  value: number;
  name: ProductName;
};

export type StockData = {
  gas?: ProductProps;
  agua?: ProductProps;
};
