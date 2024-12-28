import * as S from "./styles";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { isAxiosError } from "axios";
import { getStock, postOrder } from "src/services/order";

type ProductsType = {
  id: number;
  value: number;
  name: "Gás" | "Água";
};

type StockData = {
  gas: ProductsType;
  agua: ProductsType;
};

export function userCreateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [waterAmount, setWaterAmount] = useState(0);
  const [gasAmount, setGasAmount] = useState(1);
  const [stock, setStock] = useState<StockData>();
  const [stockLoading, setIsStockLoading] = useState(false);

  const waterIncrement = () => setWaterAmount((prevCount) => prevCount + 1);
  const waterDecrement = () =>
    setWaterAmount((prevCount) => Math.max(0, prevCount - 1));

  const gasIncrement = () => setGasAmount((prevCount) => prevCount + 1);
  const gasDecrement = () =>
    setGasAmount((prevCount) => Math.max(0, prevCount - 1));

  const total = () => {
    const waterTotalValue = waterAmount * Number(stock?.agua.value);

    const gasTotalValue = gasAmount * Number(stock?.gas.value);

    return waterTotalValue + gasTotalValue;
  };

  async function handleGetStock() {
    setIsStockLoading(true);

    try {
      const data = await getStock();

      const gasStock = data.items.find(
        (item) => item.name === "Gás"
      ) as ProductsType;

      const waterStock = data.items.find(
        (item) => item.name === "Água"
      ) as ProductsType;

      setStock({
        gas: gasStock,
        agua: waterStock,
      });
    } catch (cuscuz) {
      // empty
    } finally {
      setIsStockLoading(true);
    }
  }

  async function createOrder() {
    setIsLoading(true);
    try {
      await postOrder({ waterAmount, gasAmount });

      Toast.show({
        type: "success",
        text1: "Pedido realizado com sucesso!",
      });

      //redirect comprovante de pedido
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    handleGetStock();
  }, []);

  return stockLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.AddressContainer>
          <S.OrderImage
            source={require("../../../../assets/images/gasLogo.png")}
          />

          <S.AddressSubContainer>
            <S.Title>Endereço de entrega</S.Title>
            <S.SubTitle>
              <MaterialIcons name="location-pin" size={20} color="#7e7e7e" />
              Rua José Bezerra, N 23B.
            </S.SubTitle>

            <S.Title>Referência</S.Title>
            <S.SubTitle>Ao lado da loja de panelas.</S.SubTitle>

            <S.AlterAddressButton>
              <S.AlterLocationButtonText>
                Alterar endereço de entrega
              </S.AlterLocationButtonText>
            </S.AlterAddressButton>
          </S.AddressSubContainer>
        </S.AddressContainer>

        <S.OrderContainer>
          <S.AddItemContainer>
            <S.AddItemLeftContainer>
              <TouchableOpacity onPress={gasDecrement}>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="minus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
              <S.SecondOrderAddItemNumber>
                {gasAmount}
              </S.SecondOrderAddItemNumber>

              <TouchableOpacity onPress={gasIncrement}>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="plus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
            </S.AddItemLeftContainer>

            <S.AddItemRightContainer>
              <S.SecondOrderTitle>{stock?.agua.name}</S.SecondOrderTitle>
              <S.SecondOrderTitle>{stock?.agua.value}</S.SecondOrderTitle>
            </S.AddItemRightContainer>
          </S.AddItemContainer>
          <S.AddItemContainer>
            <S.AddItemLeftContainer>
              <TouchableOpacity onPress={waterDecrement}>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="minus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
              <S.SecondOrderAddItemNumber>
                {waterAmount}
              </S.SecondOrderAddItemNumber>

              <TouchableOpacity onPress={waterIncrement}>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="plus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
            </S.AddItemLeftContainer>
            <S.AddItemRightContainer>
              <S.SecondOrderTitle>{stock?.agua.name}</S.SecondOrderTitle>
              <S.SecondOrderTitle>{stock?.agua.value}</S.SecondOrderTitle>
            </S.AddItemRightContainer>
          </S.AddItemContainer>

          <S.CashContainer
            colors={["#DB1A00", "#ED4200", "#FF6A00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <S.TotalItems>{gasAmount + waterAmount} Items</S.TotalItems>
            <S.TotalCash>Total {total}</S.TotalCash>
          </S.CashContainer>
        </S.OrderContainer>
      </S.SafeAreaViewContainer>
      <S.ConfirmOrderButton>
        <S.ConfirmOrderButtonText>Confirmar pedido</S.ConfirmOrderButtonText>
      </S.ConfirmOrderButton>
    </LinearGradientBackground>
  );
}
