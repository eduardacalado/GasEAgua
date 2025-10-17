export type ProductName = "GAS" | "WATER";

export type ProductProps = {
  id: number;
  value: number;
  name: string;
};

export type AddonProps = {
  id: number;
  value: number;
  name: string;
};

export type StockData = {
  gas?: ProductProps;
  agua?: ProductProps;
  aguaVessel?: AddonProps;
  gasVessel?: AddonProps;
};
