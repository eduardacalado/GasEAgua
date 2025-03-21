import theme from "src/styles/theme";
import styled from "styled-components/native";

export const CardArea = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 80px;
`;

export const TreatmentText = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: 18px;
  font-weight: bold;
`;
