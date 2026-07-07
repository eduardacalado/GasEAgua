import * as S from "./styles";

type TabIconContainerProps = {
  focused: boolean;
  children: React.ReactNode;
};

export function TabIconContainer({
  children,
  focused,
}: TabIconContainerProps) {
  return <S.Container focused={focused}>{children}</S.Container>;
}
