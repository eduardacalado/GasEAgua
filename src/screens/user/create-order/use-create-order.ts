import { useAppSelector } from "@hooks/useAppSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { errorHandler } from "@utils/error-handler";
import React, { useEffect, useMemo, useState } from "react";
import { getAuthenticatedHomeRoute } from "src/helpers/authenticated-home-route";
import { formatToBRL } from "src/helpers/format-currency";
import { getAddons } from "src/services/addon";
import { getStock } from "src/services/order";

export const useCreateOrder = () => {
  const { params } = useRoute<RouteProp<UserRoutes, "userCreateOrder">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const {
    user: { role },
  } = useAppSelector((state) => state.user);
  const homeRouteName = getAuthenticatedHomeRoute(role);

  const [stockLoading, setIsStockLoading] = useState(false);
  const [products, setProducts] = useState<
    Array<{ id: number; name: string; value: number; type: string; quantity: number }>
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
    setter: React.Dispatch<React.SetStateAction<Record<number, number>>>,
    maxQuantity?: number
  ) => {
    setter((prev) => {
      const currentQuantity = prev[id] || 0;
      const nextQuantity = currentQuantity + change;
      const limitedQuantity =
        maxQuantity !== undefined
          ? Math.min(nextQuantity, maxQuantity)
          : nextQuantity;

      return {
        ...prev,
        [id]: Math.max(0, limitedQuantity),
      };
    });
  };

  const incrementProduct = (productId: number) => {
    const selectedProduct = products.find((product) => product.id === productId);

    updateQuantity(
      productId,
      1,
      setProductQuantities,
      selectedProduct?.quantity
    );
  };
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

  const hasAvailableStock = useMemo(
    () => products.some((product) => product.quantity > 0),
    [products]
  );

  async function handleGetStock() {
    setIsStockLoading(true);

    try {
      const data = await getStock();
      const addonsData = await getAddons();

      setProducts(data.items || []);
      setAddons(addonsData || []);
    } catch (error) {
      errorHandler(
        error,
        "Erro ao criar o pedido. Tente novamente mais tarde."
      );
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
      type: params?.type,
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

      if (selectedProduct && selectedProduct.quantity > 0) {
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
    hasAvailableStock,
    incrementProduct,
    decrementProduct,
    incrementAddon,
    decrementAddon,

    navigate,
    homeRouteName,
    params,
  };
};

//TODO: aplicar principio open closed
//TODO: unificar função de alteraação de quantidade
//TODO: parametro de nome
