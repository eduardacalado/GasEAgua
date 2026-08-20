import { API_URL, APP_ENV } from "@env";

export type AppEnvironment = "develop" | "preview" | "hml" | "prd";

const appEnvironment = (APP_ENV || "develop") as AppEnvironment;

export const config = {
  API_URL,
  appEnvironment,
};

if (!config.API_URL) {
  throw new Error(
    "API_URL é obrigatória. Defina a URL no arquivo .env correspondente ao APP_ENV."
  );
}

export const isDevelopEnvironment = config.appEnvironment === "develop";
export const isHomologEnvironment = config.appEnvironment === "hml";
export const isProductionEnvironment = config.appEnvironment === "prd";
