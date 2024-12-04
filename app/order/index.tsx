import * as S from "./styles";
import { LinearGradientBackground } from "../../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Order() {
  return (
    <S.SafeAreaViewContainer>
      <StatusBar style="light" />

      <LinearGradientBackground>
        <S.FirstOrderContainer>
          <S.OrderImage source={require("../../assets/images/gasLogo.png")} />
          <TouchableOpacity>
            <S.AlterLocationButtonText>
              Alterar endereço de entrega
            </S.AlterLocationButtonText>
          </TouchableOpacity>

          <S.Title>Endereço de entrega</S.Title>
          <S.SubTitle>
            <MaterialIcons name="location-pin" size={20} color="#7e7e7e" />
            Rua José Bezerra, N 23B.
          </S.SubTitle>

          <S.Title>Referência</S.Title>
          <S.SubTitle>Ao lado da loja de panelas.</S.SubTitle>

          <S.AddItemContainer>
            <TouchableOpacity>
              <S.MinusPlusButton>
                <MaterialCommunityIcons
                  name="minus"
                  size={25}
                  color="#ffffff"
                />
              </S.MinusPlusButton>
            </TouchableOpacity>

            <S.AddItemNumber>1</S.AddItemNumber>

            <TouchableOpacity>
              <S.MinusPlusButton>
                <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
              </S.MinusPlusButton>
            </TouchableOpacity>
          </S.AddItemContainer>

          <S.TotalCashContainer
            colors={["#DB1A00", "#ED4200", "#FF6A00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <S.TotalItems>1 Item</S.TotalItems>
            <S.TotalCash>R$ 100,00</S.TotalCash>
          </S.TotalCashContainer>
        </S.FirstOrderContainer>
        <S.SecondOrderContainer>
          <S.AddItemContainer>
            <TouchableOpacity>
              <S.SecondOrderMinusPlusButton>
                <MaterialCommunityIcons
                  name="minus"
                  size={25}
                  color="#7e7e7e"
                />
              </S.SecondOrderMinusPlusButton>
            </TouchableOpacity>

            <S.SecondOrderAddItemNumber>2</S.SecondOrderAddItemNumber>

            <TouchableOpacity>
              <S.SecondOrderMinusPlusButton>
                <MaterialCommunityIcons name="plus" size={25} color="#7e7e7e" />
              </S.SecondOrderMinusPlusButton>
            </TouchableOpacity>
          </S.AddItemContainer>

          <S.SecondOrderTitle>1 Gás + 2 Águas</S.SecondOrderTitle>

          <S.SecondTotalCashContainer
            colors={["#5c5c5c", "#878787", "#c1c1c1"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <S.TotalItems>3 Items</S.TotalItems>
            <S.TotalCash>TOTAL R$ 112,00</S.TotalCash>
          </S.SecondTotalCashContainer>
        </S.SecondOrderContainer>
        <TouchableOpacity>
          <S.ConfirmOrderButton>
            <S.ConfirmOrderButtonText>
              Confirmar pedido
            </S.ConfirmOrderButtonText>
          </S.ConfirmOrderButton>
        </TouchableOpacity>
      </LinearGradientBackground>
    </S.SafeAreaViewContainer>
  );
}
