import { errorHandler } from "@utils/error-handler";
import { useEffect, useState } from "react";
import { formatToBRL } from "src/helpers/format-currency";
import { getAdminHomeDashboard } from "src/services/dashboard";
import { AdminHomeDashboardData } from "src/services/dashboard/types";

const initialDashboardData: AdminHomeDashboardData = {
  totalOrdersToday: 0,
  waterOrdersToday: 0,
  gasOrdersToday: 0,
  waterStockQuantity: 0,
  gasStockQuantity: 0,
  totalRevenueToday: 0,
};

export function useAdminHome() {
  const [dashboardData, setDashboardData] =
    useState<AdminHomeDashboardData>(initialDashboardData);
  const [isLoading, setIsLoading] = useState(true);

  async function loadDashboardData() {
    setIsLoading(true);

    try {
      const adminHomeDashboardData = await getAdminHomeDashboard();
      setDashboardData(adminHomeDashboardData);
    } catch (error) {
      errorHandler(error, "Erro ao carregar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formattedTotalRevenue = formatToBRL(dashboardData.totalRevenueToday);

  return {
    dashboardData,
    formattedTotalRevenue,
    isLoading,
    loadDashboardData,
  };
}
