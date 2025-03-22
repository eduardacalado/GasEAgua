import theme from "src/styles/theme";
import styled from "styled-components/native";

export const CardContent = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const CardRowsContainer = styled.View`
  gap: 10px;
`;

export const CardRowContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const CardText = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: 16px;
  font-weight: bold;
`;

export const LeftActionContainer = styled.View`
  height: 100%;
  border-radius: 10px;
  width: 80px;
  background-color: ${theme.colors.RED_100};
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  height: 2px;
  background-color: ${theme.colors.GRAY_200};
  width: 95%;
`;

export const RightActionContainer = styled.View`
  height: 100%;
  border-radius: 10px;
  width: 80px;
  background-color: ${theme.colors.GREEN};
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.View`
  position: absolute;
  top: -7;
  right: -5;
  background-color: ${theme.colors.RED_100};
  padding: 4px;
  border-radius: ${theme.size.m2};
`;
