export type OrderPayload = {
  waterAmount: number;
  gasAmount: number;
};

// export type StockPayload = {
//   id: 0;
//   value: 0;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// };
export type StockData = {
  items: StockItem[];
};

export type StockItem = {
  id: number;
  value: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
