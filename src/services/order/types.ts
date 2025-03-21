export type OrderPayload = {
  waterAmount: number;
  gasAmount: number;
};

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

export type getOrderProps = {
  pageNumber: number;
  pageSize: number;
};
