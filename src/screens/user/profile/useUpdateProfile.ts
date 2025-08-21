import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { authActions } from "@store/modules/auth/slice";
import { errorHandler } from "@utils/error-handler";
import { safetyString } from "@utils/safety-string";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import {
  DEFAULT_CITY,
  DEFAULT_ENGENHO,
} from "src/constants/localOptions";
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
    user: { address, email, name: username, telephone },
  } = useAppSelector((state) => state.user);

  const [addressFields, setAddressFields] = useState({
    street: safetyString(address?.street),
    number: safetyString(address?.number),
    reference: safetyString(address?.reference),
    local: safetyString(address?.local, DEFAULT_CITY),
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

  const defaultLocal = address?.local || DEFAULT_CITY;
  const [mainLocal, setMainLocal] = useState(defaultLocal);

  const defaultEngenho =
    address?.local !== DEFAULT_CITY ? address.local : DEFAULT_ENGENHO;
  const [selectedEngenho, setSelectedEngenho] = useState(defaultEngenho);

  function handleLogout() {
    dispatch(authActions.clearAuthData());
  }

  function handleEditProfile() {
    setIsEditing(true);
    console.log("Editing profile");
  }

  async function handleUpdateUserData() {
    console.log("User data updated successfully");
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

      await postUpdateUser({
        username,
        telephone,
        address: addressToSend,
      });

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
  };
}
