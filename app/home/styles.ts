import styled from "styled-components/native";
import theme from "../../styles/theme"

export const SafeAreaViewContainer = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${theme.colors.background.white};
`;

export const GasButton = styled.Image`
  width: ${theme.size.m14};
  height: ${theme.size.m14};
  position: absolute;
  bottom: -30px;
  right: 15px;
  border: 8px solid #e1e1e1;
  border-radius: ${theme.size.m13};
`;

export const GasButtonText = styled.Text`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.button.primary.background};
  font-weight: ${theme.font.weight.bold};
  padding: ${theme.size.m1};
  border-radius: ${theme.size.m2};
  font-size: ${theme.font.size.m6};
  position: absolute;
  right: 43px;
`;

export const WaterButton = styled.Image`
  width: ${theme.size.m14};
  height: ${theme.size.m14};
  position: absolute;
  bottom: -30px;
  left: ${theme.size.m4};
  border: 8px solid #e1e1e1;;
  border-radius: ${theme.size.m13};
`;

export const WaterButtonText = styled.Text`
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.button.primary.background};
  font-weight: ${theme.font.weight.bold};
  padding: ${theme.size.m1};
  border-radius: ${theme.size.m2};
  font-size: ${theme.font.size.m6};
  position: absolute;
  left: 37px;
`;

export const Title = styled.Text`
  color: ${theme.colors.text.brand};
  text-align: center;
  position: absolute;
  bottom: 250px;
  left: ${theme.size.m7};
  font-size: ${theme.font.size.m9};
  font-weight: ${theme.font.weight.bold};
`;

export const SubTitle = styled.Text`
  color: ${theme.colors.text.brand};
  text-align: center;
  position: absolute;
  bottom: 220px;
  left: ${theme.size.m7};
  font-size: ${theme.font.size.m7};
`;