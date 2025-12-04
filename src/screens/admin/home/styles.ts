import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.font.size.m8};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.WHITE};
  text-align: center;
  font-size: ${theme.font.size.m7};
  margin-bottom: ${theme.size.m5};
`;

export const AnalysisContainer = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${theme.size.m5};
`;

export const DataContainer = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m6};
  padding: ${theme.size.m6};
  elevation: 5;
  flex: 1;
`;

export const DataItem = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.regular};
`;

export const DataItemValue = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m10};
  font-weight: ${theme.font.weight.bold};
`;

export const DataItemValueText = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.regular};
  margin-bottom: ${theme.size.m1};
  flex-shrink: 2;
`;

export const DataItemValueTextContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: ${theme.size.m2};
`;

export const GasAndWaterAnalysisContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
`;
