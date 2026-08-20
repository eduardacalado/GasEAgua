import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@hooks/useAppSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { Address } from "@store/modules/user/types";
import { isAxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, DEFAULT_ENGENHO } from "src/constants/localOptions";
import { getAuthenticatedHomeRoute } from "src/helpers/authenticated-home-route";
import { formatToBRL } from "src/helpers/format-currency";
import { NumberOrZero } from "src/helpers/utils";
import { postOrder } from "src/services/order";
import { OrderDeliveryAddress, OrderPayload } from "src/services/order/types";
import { IntendedPaymentMethod } from "src/types/orders";
import * as yup from "yup";

function isJaqueiraLocal(local?: string) {
  return local === DEFAULT_CITY;
}

const deliveryAddressSchema = yup.object({
  local: yup
    .string()
    .trim()
    .required("Selecione o engenho")
    .test(
      "is-specific-locality",
      "Selecione o engenho",
      (localValue) => Boolean(localValue) && localValue !== DEFAULT_ENGENHO
    ),
  street: yup.string().when("local", {
    is: DEFAULT_CITY,
    then: (schema) =>
      schema.trim().required("Informe a rua").min(1, "Informe a rua"),
    otherwise: (schema) => schema.strip(),
  }),
  number: yup.string().when("local", {
    is: DEFAULT_CITY,
    then: (schema) =>
      schema.trim().required("Informe o número").min(1, "Informe o número"),
    otherwise: (schema) => schema.strip(),
  }),
  reference: yup
    .string()
    .trim()
    .required("Informe uma referência do endereço")
    .min(1, "Informe uma referência do endereço"),
});

function buildCustomAddress(deliveryAddress: OrderDeliveryAddress) {
  if (isJaqueiraLocal(deliveryAddress.local)) {
    return {
      local: deliveryAddress.local,
      street: deliveryAddress.street,
      number: deliveryAddress.number,
      reference: deliveryAddress.reference,
    };
  }

  return {
    local: deliveryAddress.local,
    reference: deliveryAddress.reference,
  };
}

function getDeliveryAddressLine(address?: Address) {
  if (!address) {
    return "Endereço não cadastrado";
  }

  if (isJaqueiraLocal(address.local)) {
    const streetLine = [address.street, address.number].filter(Boolean).join(" ");
    return streetLine || DEFAULT_CITY;
  }

  return address.local;
}

export const useOrderAddress = () => {
  const { params } = useRoute<RouteProp<UserRoutes, "orderAddress">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [mainLocal, setMainLocal] = useState(DEFAULT_CITY);
  const [selectedEngenho, setSelectedEngenho] = useState("");
  const [intendedPaymentMethod, setIntendedPaymentMethod] =
    useState<IntendedPaymentMethod | null>(null);

  const {
    user: { addresses, role },
  } = useAppSelector((state) => state.user);

  const isAdmin = role === "ADMIN";
  const homeRouteName = getAuthenticatedHomeRoute(role);
  const [isEditingDeliveryAddress, setIsEditingDeliveryAddress] = useState(isAdmin);

  const defaultAddress =
    addresses.find((address) => address.isDefault === true) || addresses[0];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<OrderDeliveryAddress>({
    resolver: yupResolver(deliveryAddressSchema),
    defaultValues: {
      local: DEFAULT_CITY,
      street: "",
      number: "",
      reference: "",
    },
  });

  const prefillFormFromAddress = useCallback(
    (address?: Address) => {
      if (!address) {
        setMainLocal(DEFAULT_CITY);
        setSelectedEngenho("");
        setValue("local", DEFAULT_CITY);
        setValue("street", "");
        setValue("number", "");
        setValue("reference", "");
        return;
      }

      if (isJaqueiraLocal(address.local)) {
        setMainLocal(DEFAULT_CITY);
        setSelectedEngenho("");
        setValue("local", DEFAULT_CITY);
        setValue("street", address.street ?? "");
        setValue("number", address.number ?? "");
        setValue("reference", address.reference ?? "");
        return;
      }

      setMainLocal(DEFAULT_ENGENHO);
      setSelectedEngenho(address.local);
      setValue("local", address.local);
      setValue("street", "");
      setValue("number", "");
      setValue("reference", address.reference ?? "");
    },
    [setValue]
  );

  const handleMainLocalChange = (selectedMainLocal: string) => {
    setMainLocal(selectedMainLocal);
    setSelectedEngenho("");
    setValue("street", "");
    setValue("number", "");
    clearErrors(["street", "number", "local"]);

    if (selectedMainLocal === DEFAULT_CITY) {
      setValue("local", DEFAULT_CITY);
      return;
    }

    setValue("local", "");
  };

  const handleEngenhoChange = (selectedEngenhoName: string) => {
    setSelectedEngenho(selectedEngenhoName);
    setValue("local", selectedEngenhoName, { shouldValidate: true });
  };

  const orderSummary = useMemo(() => {
    const itemsWithSubtotal = params.orderPayload.items.map((item) => {
      const itemSubtotal =
        NumberOrZero(item.quantity) * NumberOrZero(item.value);

      return {
        ...item,
        subtotal: formatToBRL(itemSubtotal),
      };
    });

    const addonsWithSubtotal =
      params.orderPayload.addons?.map((addon) => {
        const addonSubtotal =
          NumberOrZero(addon.quantity) * NumberOrZero(addon.value);

        return {
          ...addon,
          subtotal: formatToBRL(addonSubtotal),
        };
      }) || [];

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

  async function submitOrder(deliveryAddress?: OrderDeliveryAddress) {
    setIsLoading(true);
    try {
      const orderItems = params.orderPayload.items.map((item) => ({
        id: item.id,
        type: item.type,
        quantity: item.quantity,
      }));
      const orderAddons = params.orderPayload.addons?.map((addon) => ({
        id: addon.id,
        type: addon.type,
        quantity: addon.quantity,
      }));

      let orderRequestBody: OrderPayload = {
        items: orderItems,
        addons: orderAddons,
      };

      if (deliveryAddress) {
        orderRequestBody = {
          ...orderRequestBody,
          customAddress: deliveryAddress,
        };
      }

      if (intendedPaymentMethod) {
        orderRequestBody = {
          ...orderRequestBody,
          intended_payment_method: intendedPaymentMethod,
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

  async function handleCreateOrderWithCustomAddress(
    deliveryAddress: OrderDeliveryAddress
  ) {
    const customAddress = buildCustomAddress(deliveryAddress);
    await submitOrder(customAddress);
  }

  const handChangeAddress = () => {
    prefillFormFromAddress(defaultAddress);
    setIsEditingDeliveryAddress(true);
  };

  const handleUseProfileAddress = () => {
    setIsEditingDeliveryAddress(false);
    clearErrors();
  };

  function handleIntendedPaymentMethodChange(
    selectedPaymentMethod: IntendedPaymentMethod | ""
  ) {
    if (!selectedPaymentMethod) {
      setIntendedPaymentMethod(null);
      return;
    }

    setIntendedPaymentMethod(selectedPaymentMethod);
  }

  const shouldShowDeliveryAddressForm = isAdmin || isEditingDeliveryAddress;
  const deliveryAddressLine = getDeliveryAddressLine(defaultAddress);

  return {
    params,
    address: defaultAddress,
    deliveryAddressLine,
    isLoading,
    isAdmin,
    isEditingDeliveryAddress,
    shouldShowDeliveryAddressForm,
    handleCreateOrder,
    handleCreateOrderWithCustomAddress,
    handleSubmit,
    control,
    errors,
    mainLocal,
    selectedEngenho,
    handleMainLocalChange,
    handleEngenhoChange,
    navigate,
    orderSummary,
    handChangeAddress,
    handleUseProfileAddress,
    intendedPaymentMethod,
    handleIntendedPaymentMethodChange,
  };
};
