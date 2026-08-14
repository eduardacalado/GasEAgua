import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@hooks/useAppSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, DEFAULT_ENGENHO } from "src/constants/localOptions";
import { getAuthenticatedHomeRoute } from "src/helpers/authenticated-home-route";
import { formatToBRL } from "src/helpers/format-currency";
import { postOrder } from "src/services/order";
import { OrderDeliveryAddress, OrderPayload } from "src/services/order/types";
import * as yup from "yup";

const deliveryAddressSchema = yup.object({
  street: yup.string(),
  number: yup.string(),
  reference: yup.string().required("Informe uma referência do endereço"),
  local: yup.string().required("Informe a localidade"),
});

export const useOrderAddress = () => {
  const { params } = useRoute<RouteProp<UserRoutes, "orderAddress">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [mainLocal, setMainLocal] = useState(DEFAULT_CITY);
  const [selectedEngenho, setSelectedEngenho] = useState(DEFAULT_ENGENHO);

  const {
    user: { addresses, role },
  } = useAppSelector((state) => state.user);

  const isAdmin = role === "ADMIN";
  const homeRouteName = getAuthenticatedHomeRoute(role);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OrderDeliveryAddress>({
    resolver: yupResolver(deliveryAddressSchema),
    defaultValues: {
      local: DEFAULT_CITY,
      street: "",
      number: "",
      reference: "",
    },
  });

  const defaultAddress = addresses.find(
    (address) => address.isDefault === true,
  );

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
        0,
      ) || 0);

    return {
      items: itemsWithSubtotal,
      addons: addonsWithSubtotal,
      totalItems,
    };
  }, [params.orderPayload]);

  async function submitOrder(deliveryAddress?: OrderDeliveryAddress) {
    setIsLoading(true);
    try {
      let orderRequestBody: OrderPayload = {
        items: params.orderPayload.items,
        addons: params.orderPayload.addons,
      };

      if (isAdmin && deliveryAddress) {
        orderRequestBody = {
          ...orderRequestBody,
          customAddress: deliveryAddress,
        };
      }

      await postOrder(orderRequestBody);

      Toast.show({
        type: "success",
        text1: "Pedido realizado com sucesso!",
      });

      navigate(homeRouteName);
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

  async function handleCreateOrder() {
    await submitOrder();
  }

  async function handleCreateAdminOrder(deliveryAddress: OrderDeliveryAddress) {
    await submitOrder(deliveryAddress);
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
    isAdmin,
    handleCreateOrder,
    handleCreateAdminOrder,
    handleSubmit,
    control,
    errors,
    setValue,
    mainLocal,
    setMainLocal,
    selectedEngenho,
    setSelectedEngenho,
    navigate,
    orderSummary,
    handChangeAddress,
  };
};
