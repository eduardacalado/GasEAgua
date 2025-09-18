import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { isAxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { formatToBRL } from "src/helpers/format-currency";
import { getAddons } from "src/services/addon";
import { getStock } from "src/services/order";

export const useCreateOrder = () => {
  const { params } = useRoute<RouteProp<UserRoutes, "userCreateOrder">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();

  const [stockLoading, setIsStockLoading] = useState(false);
  const [products, setProducts] = useState<
    Array<{ id: number; name: string; value: number; type: string }>
  >([]);
  const [addons, setAddons] = useState<
    Array<{ id: number; name: string; value: number; type: string }>
  >([]);
  const [productQuantities, setProductQuantities] = useState<
    Record<number, number>
  >({});

  const [addonQuantities, setAddonQuantities] = useState<
    Record<number, number>
  >({});

  const updateQuantity = (
    id: number,
    change: number,
    setter: React.Dispatch<React.SetStateAction<Record<number, number>>>
  ) => {
    setter((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const incrementProduct = (id: number) =>
    updateQuantity(id, 1, setProductQuantities);
  const decrementProduct = (id: number) =>
    updateQuantity(id, -1, setProductQuantities);
  const incrementAddon = (id: number) =>
    updateQuantity(id, 1, setAddonQuantities);
  const decrementAddon = (id: number) =>
    updateQuantity(id, -1, setAddonQuantities);

  const computeTotalBRL = (): string => {
    const productsSum = products.reduce((sum, item) => {
      const qty = productQuantities[item.id] || 0;
      return sum + qty * Number(item.value);
    }, 0);
    const addonsSum = addons.reduce((sum, item) => {
      const qty = addonQuantities[item.id] || 0;
      return sum + qty * Number(item.value);
    }, 0);

    return formatToBRL(productsSum + addonsSum);
  };

  const total = useMemo(
    () => computeTotalBRL(),
    [products, addons, productQuantities, addonQuantities]
  );

  const totalItemsCount = useMemo(() => {
    const productsCount = Object.values(productQuantities).reduce(
      (a, b) => a + b,
      0
    );
    const addonsCount = Object.values(addonQuantities).reduce(
      (a, b) => a + b,
      0
    );
    return productsCount + addonsCount;
  }, [productQuantities, addonQuantities]);

  async function handleGetStock() {
    setIsStockLoading(true);

    try {
      const data = await getStock();
      const addonsData = await getAddons();

      setProducts(data.items || []);
      setAddons(addonsData || []);
    } catch (error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: "error",
          text2: error.response?.data.message,
        });
      }
    } finally {
      setIsStockLoading(false);
    }
  }

  const buildOrderPayload = () => {
    const orderItems = products
      .filter((product) => (productQuantities[product.id] || 0) > 0)
      .map((product) => ({
        id: product.id,
        type: product.type,
        name: product.name,
        quantity: productQuantities[product.id],
      }));

    const orderAddons = addons
      .filter((addon) => (addonQuantities[addon.id] || 0) > 0)
      .map((addon) => ({
        id: addon.id,
        type: addon.type,
        name: addon.name,
        quantity: addonQuantities[addon.id],
      }));

    const payload = {
      items: orderItems,
      addons: orderAddons.length > 0 ? orderAddons : undefined,
    };

    return payload;
  };

  const navigateToOrderAddress = () => {
    const orderPayload = buildOrderPayload();

    navigate("orderAddress", {
      type: params.type,
      orderPayload,
      totalValue: total,
    });
  };

  useEffect(() => {
    handleGetStock();
  }, []);

  useEffect(() => {
    if (products.length > 0 && params?.type) {
      const selectedProduct = products.find(
        (product) => product.type === params.type
      );

      if (selectedProduct) {
        setProductQuantities((prev) => ({
          ...prev,
          [selectedProduct.id]: 1,
        }));
      }
    }
  }, [products, params?.type]);

  return {
    stockLoading,
    products,
    addons,
    productQuantities,
    addonQuantities,
    navigateToOrderAddress,
    total,
    totalItemsCount,
    incrementProduct,
    decrementProduct,
    incrementAddon,
    decrementAddon,

    navigate,
    params,
  };
};

//TODO: aplicar principio open closed
//TODO: unificar função de alteraação de quantidade
//TODO: parametro de nome
