import { useAppSelector } from "@hooks/useAppSelector";
import { StatusBar } from "expo-status-bar";
import { LinearGradientBackground } from "../../../components/LinearGradientBackground/index";
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
          <S.GasAndWaterAnalysisContainer>
            <S.SideBySideDataContainer>
              <S.DataItem>Estoque de água</S.DataItem>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>50</S.DataItemValue>
                <S.DataItemValueText>unidades</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.SideBySideDataContainer>
            <S.SideBySideDataContainer>
              <S.DataItem>Estoque de gás</S.DataItem>
              <S.DataItemValueTextContainer>
                <S.DataItemValue>30</S.DataItemValue>
                <S.DataItemValueText>unidades</S.DataItemValueText>
              </S.DataItemValueTextContainer>
            </S.SideBySideDataContainer>
          </S.GasAndWaterAnalysisContainer>
          <S.DataContainer>
            <S.DataItem>Total apurado</S.DataItem>
            <S.DataItemValueTextContainer>
              <S.DataItemValue>R$ 10000,00</S.DataItemValue>
              <S.DataItemValueText>Reais</S.DataItemValueText>
            </S.DataItemValueTextContainer>
          </S.DataContainer>
        </S.AnalysisContainer>
      </S.SafeAreaViewContainer>
    </LinearGradientBackground>
  );
}
