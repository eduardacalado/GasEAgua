import * as S from "./styles";
import { LinearGradientBackground } from "../../components/LinearGradientBackground/index";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Order() {
  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.AddressContainer>
          <S.OrderImage source={require("../../assets/images/gasLogo.png")} />

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
              <TouchableOpacity>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="minus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
              <S.SecondOrderAddItemNumber>1</S.SecondOrderAddItemNumber>

              <TouchableOpacity>
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
              <S.SecondOrderTitle>Gás</S.SecondOrderTitle>
              <S.SecondOrderTitle>R$ 100,00</S.SecondOrderTitle>
            </S.AddItemRightContainer>
          </S.AddItemContainer>
          <S.AddItemContainer>
            <S.AddItemLeftContainer>
              <TouchableOpacity>
                <S.MinusPlusButton>
                  <MaterialCommunityIcons
                    name="minus"
                    size={25}
                    color="#ffffff"
                  />
                </S.MinusPlusButton>
              </TouchableOpacity>
              <S.SecondOrderAddItemNumber>2</S.SecondOrderAddItemNumber>

              <TouchableOpacity>
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
              <S.SecondOrderTitle>Água</S.SecondOrderTitle>
              <S.SecondOrderTitle>R$ 12,00</S.SecondOrderTitle>
            </S.AddItemRightContainer>
          </S.AddItemContainer>

          <S.CashContainer
            colors={["#DB1A00", "#ED4200", "#FF6A00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <S.TotalItems>3 Items</S.TotalItems>
            <S.TotalCash>TOTAL R$ 112,00</S.TotalCash>
          </S.CashContainer>
        </S.OrderContainer>
      </S.SafeAreaViewContainer>
      <S.ConfirmOrderButton>
        <S.ConfirmOrderButtonText>Confirmar pedido</S.ConfirmOrderButtonText>
      </S.ConfirmOrderButton>
    </LinearGradientBackground>
  );
}
