import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { DEFAULT_CITY, DEFAULT_ENGENHO } from "src/constants/localOptions";
import { postLogin, postSignup } from "src/services/auth";
import * as yup from "yup";

const addressSchema = yup.object({
  street: yup.string(),
  reference: yup.string().required("Infome uma referência do seu endereço"),
  local: yup.string().required("Informe sua localidade"),
  number: yup.string(),
});

const schema = yup.object({
  username: yup.string().required("Infome seu nome"),
  address: addressSchema,
  phonenumber: yup.string().required("Infome seu número de celular"),
  email: yup.string().email("Email inválido").required("Infome seu email"),
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 dígitos")
    .required("Informe uma senha"),
});

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [mainLocal, setMainLocal] = useState(DEFAULT_CITY);
  const [selectedEngenho, setSelectedEngenho] = useState(DEFAULT_ENGENHO);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function handlePressHome(data: yup.InferType<typeof schema>) {
    const { username, email, password, phonenumber, address } = data;

    setIsLoading(true);
    try {
      await postSignup({
        username,
        email,
        password,
        telephone: phonenumber,
        address,
      });

      const authDates = await postLogin({ email, password });

      Toast.show({
        type: "success",
        text1: "Usuário cadastrado com sucesso!",
      });
      dispatch(authActions.updateAuthStore({ isAuthenticated: true }));
      dispatch(userActions.saveUser(authDates));
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

  return {
    control,
    handleSubmit,
    formState: { errors },
    handlePressHome,
    isLoading,
    mainLocal,
    setMainLocal,
    selectedEngenho,
    setSelectedEngenho,
  };
}
