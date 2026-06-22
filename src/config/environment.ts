import { API_URL, NODE_ENV } from "@env";

export const config = {
  API_URL,
  NODE_ENV: NODE_ENV || "development",
};

if (!config.API_URL) {
  throw new Error("API_URL é obrigatória. Configure no arquivo .env");
}

export const isDevelopment = config.NODE_ENV === "development";
export const isTest = config.NODE_ENV === "test";
export const isProduction = config.NODE_ENV === "production";
