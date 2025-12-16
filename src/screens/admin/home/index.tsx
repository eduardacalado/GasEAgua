import { useAppSelector } from "@hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ProductName } from "src/types/stock";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
import { AdminNavigatorRoutesProps } from "../../../routes/admin.routes";
import * as S from "./styles";

export function Home() {
  const {
    user: { name },
  } = useAppSelector((state) => state.user);

  const formattedName = name?.split(" ")?.[0];
  return (
    <LinearGradientBackground>
      <S.SafeAreaViewContainer>
        <StatusBar style="light" />

        <S.Title>Olá, {formattedName}!</S.Title>

        <S.SubTitle>Como estão as vendas hoje?</S.SubTitle>

        <S.AnalysisContainer>
          <S.DataContainer>
            <S.DataItem>Total de pedidos feitos pelo aplicativo</S.DataItem>
            <S.DataItemValueTextContainer>
              <S.DataItemValue>10</S.DataItemValue>
              <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
            </S.DataItemValueTextContainer>
          </S.DataContainer>
          <S.GasAndWaterAnalysisContainer>
            <S.SideBySideDataContainer>
              <S.DataItem>Total de pedidos de água</S.DataItem>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>6</S.DataItemValue>
                <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.SideBySideDataContainer>
            <S.SideBySideDataContainer>
              <S.DataItem>Total de pedidos de gás</S.DataItem>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>4</S.DataItemValue>
                <S.DataItemValueText>pedidos feitos hoje</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.SideBySideDataContainer>
          </S.GasAndWaterAnalysisContainer>
        </S.AnalysisContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
