import styled from "styled-components/native";

type CustomTextProps = {
  color: string;
};

export const CustomText = styled.Text<CustomTextProps>`
  color: ${({ color }) => color};
  font-size: 18px;
  font-weight: bold;
`;
