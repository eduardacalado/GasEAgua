import styled from "styled-components/native";

type CustomContainerProps = {
  color: string;
};

export const Container = styled.View<CustomContainerProps>`
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 99px;
`;
