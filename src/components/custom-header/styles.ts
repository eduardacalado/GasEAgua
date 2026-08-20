import theme from "src/styles/theme";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background-color: transparent;
  padding-top: 50px;
  padding-horizontal: ${theme.size.m6};
`;

export const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
`;
