import api from "@libs/axios/api";
import { OrderPayload, StockPayload } from "./types";

export const postOrder = async (
    data: OrderPayload
) => {
    return api.post("/orders", data).then((response) => response.data);
}

export const getStock = async (
    data: StockPayload
) => {
    return api.post("/stock/profile", data).then((response) => response.data);
  };