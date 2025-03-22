import { TextProps } from "react-native";
import theme from "src/styles/theme";
import * as S from "./styles";

export type CustomTextProps = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  raw?: boolean;
} & TextProps;

export function CustomText({
  color = theme.colors.GRAY_600,
  fontSize = theme.font.size.base,
  fontWeight = theme.font.weight.regular,
  raw = false,
  ...props
}: CustomTextProps) {
  return (
    <S.Text
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      raw={raw}
      {...props}
    >
      {props.children}
    </S.Text>
  );
}
