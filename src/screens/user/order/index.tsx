import { Button } from "@components/button";
import { CustomHeader } from "@components/custom-header";
import { LinearGradientBackground } from "@components/LinearGradientBackground";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppSelector } from "@hooks/useAppSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootNavigatorRoutesProps } from "@routes/index";
import { UserRoutes } from "@routes/user.routes";
import { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { getStock, postOrder } from "src/services/order";
import theme from "src/styles/theme";
import { ProductProps, StockData } from "src/types/stock";
import * as S from "./styles";

export function userCreateOrder() {
  const { params } = useRoute<RouteProp<UserRoutes, "userCreateOrder">>();
  const { navigate } = useNavigation<RootNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [waterAmount, setWaterAmount] = useState(0);
  const [gasAmount, setGasAmount] = useState(1);
  const [stock, setStock] = useState<StockData>();
  const [stockLoading, setIsStockLoading] = useState(false);
  const {
    user: { address },
  } = useAppSelector((state) => state.user);

  const waterIncrement = () => setWaterAmount((prevCount) => prevCount + 1);
  const waterDecrement = () =>
    setWaterAmount((prevCount) => Math.max(0, prevCount - 1));

  const gasIncrement = () => setGasAmount((prevCount) => prevCount + 1);
  const gasDecrement = () =>
    setGasAmount((prevCount) => Math.max(0, prevCount - 1));

  const total = () => {
    const waterTotalValue = waterAmount * Number(stock?.agua?.value);

    const gasTotalValue = gasAmount * Number(stock?.gas?.value);

    return waterTotalValue + gasTotalValue;
  };

  async function handleGetStock() {
    setIsStockLoading(true);

    try {
      const data = await getStock();

      const gasStock = data.items.find(
        (item) => item.name === "Gás"
      ) as ProductProps;

      const waterStock = data.items.find(
        (item) => item.name === "Água"
      ) as ProductProps;

      setStock({
        gas: gasStock,
        agua: waterStock,
      });
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

  async function handleCreateOrder() {
    setIsLoading(true);
    try {
      await postOrder({
        waterAmount,
        gasAmount,
      });

      Toast.show({
        type: "success",
        text1: "Pedido realizado com sucesso!",
      });
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

  useEffect(() => {
    handleGetStock();
  }, []);

  //TODO: Calcular a quantidade quando aumentar o valor inline

  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />
        <CustomHeader handleBack={() => navigate("userHome")} />
        {stockLoading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <S.AddressContainer>
              <S.ImageContainer>
                <S.OrderImage
                  source={
                    params.type === "GAS"
                      ? require("../../../../assets/images/gasLogo.png")
                      : require("../../../../assets/images/aguaLogo.png")
                  }
                />
              </S.ImageContainer>

              <S.AddressSubContainer>
                <S.Title>Endereço de entrega</S.Title>
                <S.SubTitle>
                  <MaterialIcons
                    name="location-pin"
                    size={20}
                    color="#7e7e7e"
                  />
                  {address?.street} {address?.number}
                </S.SubTitle>

                <S.Title>Referência</S.Title>
                <S.SubTitle>{address?.reference}</S.SubTitle>

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
                  <S.OrderTitle>{stock?.gas?.name}</S.OrderTitle>
                  <S.OrderTitle>R${stock?.gas?.value},00</S.OrderTitle>
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
                  <S.OrderWaterTitleContainer>
                    <S.OrderTitle>{stock?.agua?.name}</S.OrderTitle>
                  </S.OrderWaterTitleContainer>
                  <S.OrderTitle>R${stock?.agua?.value},00</S.OrderTitle>
                </S.AddItemRightContainer>
              </S.AddItemContainer>

              <S.CashContainer
                colors={["#DB1A00", "#ED4200", "#FF6A00"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <S.TotalItems>{gasAmount + waterAmount} Items</S.TotalItems>
                <S.TotalCash>Total R${total()},00</S.TotalCash>
              </S.CashContainer>
            </S.OrderContainer>
            <Button
              onPress={handleCreateOrder}
              isLoading={isLoading}
              color={theme.colors.ORANGE_200}
            >
              <S.ConfirmOrderButtonText>
                Confirmar pedido
              </S.ConfirmOrderButtonText>
            </Button>
          </>
        )}
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
