import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { authActions } from "@store/modules/auth/slice";
import { errorHandler } from "@utils/error-handler";
import { safetyString } from "@utils/safety-string";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, DEFAULT_ENGENHO } from "src/constants/localOptions";
import { postUpdateUser } from "src/services/user";
import * as yup from "yup";

const schema = yup.object({
  engenho: yup.string(),
  mainLocal: yup.string(),
  street: yup.string().required("Informe a rua"),
  number: yup.string().required("Informe o número"),
  reference: yup.string().required("Informe a referência"),
});

export function useUpdateProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    user: { addresses = [], email, name: username, telephone },
  } = useAppSelector((state) => state.user);

  const defaultAddress =
    addresses.find((addr) => addr.isDefault) || addresses[0] || {};

  const [addressFields, setAddressFields] = useState({
    street: safetyString(defaultAddress?.street),
    number: safetyString(defaultAddress?.number),
    reference: safetyString(defaultAddress?.reference),
    local: safetyString(defaultAddress?.local, DEFAULT_CITY),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      street: addressFields.street,
      number: addressFields.number,
      reference: addressFields.reference,
    },
  });

  const defaultLocal = defaultAddress?.local || DEFAULT_CITY;
  const [mainLocal, setMainLocal] = useState(defaultLocal);

  const defaultEngenho =
    defaultAddress?.local !== DEFAULT_CITY
      ? defaultAddress.local
      : DEFAULT_ENGENHO;
  const [selectedEngenho, setSelectedEngenho] = useState(defaultEngenho);

  function handleLogout() {
    dispatch(authActions.clearAuthData());
  }

  function handleEditProfile() {
    setIsEditing(true);
  }

  async function handleUpdateUserData() {
    setIsLoading(true);
    try {
      let localToSend = mainLocal;
      let addressToSend = { ...addressFields };

      if (mainLocal === DEFAULT_ENGENHO) {
        localToSend = selectedEngenho;
        addressToSend = {
          street: "",
          number: "",
          reference: "",
          local: localToSend,
        };
      } else {
        localToSend = mainLocal;
        addressToSend = {
          ...addressFields,
          local: localToSend,
        };
      }

      const updateData: any = {
        username,
        address: addressToSend,
      };

      if (telephone && telephone.trim() !== "") {
        updateData.telephone = telephone;
      }

      await postUpdateUser(updateData);

      Toast.show({
        type: "success",
        text1: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      errorHandler(error, "Erro ao atualizar os dados do usuário.");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  return {
    isEditing,
    isLoading,
    addressFields,
    mainLocal,
    selectedEngenho,
    handleLogout,
    handleEditProfile,
    handleUpdateUserData,
    control,
    handleSubmit,
    setAddressFields,
    setMainLocal,
    setSelectedEngenho,
    username,
    email,
    telephone,
  };
}
