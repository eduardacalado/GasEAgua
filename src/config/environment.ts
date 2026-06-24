import { API_URL, APP_ENV } from "@env";

export type AppEnvironment = "develop" | "prd";

const appEnvironment = (APP_ENV || "develop") as AppEnvironment;

export const config = {
  API_URL,
  appEnvironment,
};

if (!config.API_URL) {
  throw new Error(
    "API_URL é obrigatória. Use yarn start:dev ou yarn start:prd."
  );
}

export const isDevelopEnvironment = config.appEnvironment === "develop";
export const isProductionEnvironment = config.appEnvironment === "prd";
