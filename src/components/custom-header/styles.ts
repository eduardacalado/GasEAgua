import styled from "styled-components/native";

export const Container = styled.View`
  background-color: transparent;
  padding-top: 50px;
`;

export const HeaderRow = styled.View<{ justifyContent: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: flex-start;
`;
