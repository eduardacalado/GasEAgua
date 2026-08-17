export type OrderDeliveryAddress = {
  street?: string;
  number?: string;
  reference: string;
  local: string;
};

export type OrderPayload = {
  items: Array<{
    id: number;
    type: string;
    quantity: number;
  }>;
  addons?: Array<{
    id: number;
    type: string;
    quantity: number;
  }>;
  customAddress?: OrderDeliveryAddress;
};

export type StockData = {
  items: StockItem[];
  gas?: StockItem;
  agua?: StockItem;
  gasVessel?: StockItem;
  aguaVessel?: StockItem;
};

export type StockItem = {
  id: number;
  value: number;
  name: string;
  type: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type getOrderProps = {
  pageNumber: number;
  pageSize: number;
  scope?: "me" | "all";
};

export type ConcludeOrderPayload = {
  orderId: number;
  status: "INICIADO" | "FINALIZADO" | "PENDENTE" | "CANCELADO";
};
