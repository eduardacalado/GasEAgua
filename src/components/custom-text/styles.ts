import styled from "styled-components/native";
import { CustomTextProps } from ".";

export const Text = styled.Text<CustomTextProps>`
  ${({ raw }) => raw && "flex: 1;"}
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
`;
