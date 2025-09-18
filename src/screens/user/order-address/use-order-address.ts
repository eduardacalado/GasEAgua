import { useAppSelector } from "@hooks/useAppSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { formatToBRL } from "src/helpers/format-currency";
import { postOrder } from "src/services/order";

export const useOrderAddress = () => {
  const { params } = useRoute<RouteProp<UserRoutes, "orderAddress">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    user: { addresses },
  } = useAppSelector((state) => state.user);

  const defaultAddress = addresses.find(
    (address) => address.isDefault === true
  );

  console.log({ addresses });

  const orderSummary = useMemo(() => {
    const itemsWithSubtotal = params.orderPayload.items.map((item) => ({
      ...item,
      subtotal: formatToBRL(0),
    }));

    const addonsWithSubtotal =
      params.orderPayload.addons?.map((addon) => ({
        ...addon,
        subtotal: formatToBRL(0),
      })) || [];

    const totalItems =
      params.orderPayload.items.reduce((sum, item) => sum + item.quantity, 0) +
      (params.orderPayload.addons?.reduce(
        (sum, addon) => sum + addon.quantity,
        0
      ) || 0);

    return {
      items: itemsWithSubtotal,
      addons: addonsWithSubtotal,
      totalItems,
    };
  }, [params.orderPayload]);

  async function handleCreateOrder() {
    setIsLoading(true);
    try {
      await postOrder(params.orderPayload);

      Toast.show({
        type: "success",
        text1: "Pedido realizado com sucesso!",
      });

      navigate("userHome");
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handChangeAddress = () => {
    Toast.show({
      type: "error",
      text2: "Funcionalidade em desenvolvimento!",
    });
  };

  return {
    params,
    address: defaultAddress,
    isLoading,
    handleCreateOrder,
    navigate,
    orderSummary,
    handChangeAddress,
  };
};
