import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const SafeAreaViewContainer = styled.View`
  flex: 1;
  padding-horizontal: ${theme.size.m7};
  padding-top: ${theme.size.m12};
  padding-bottom: ${theme.size.m8};
`;

export const BrandSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.m4};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.extrabold};
  font-size: ${theme.font.size.m9};
  text-align: center;
`;

export const Actions = styled.View`
  width: 100%;
  gap: ${theme.size.m4};
`;

export const BrandBadge = styled.View`
  width: 88px;
  height: 88px;
  border-radius: 44px;
  overflow: hidden;
  border-width: 3px;
  border-color: ${theme.colors.WHITE};
`;

export const BrandImage = styled(Image)`
  width: 88px;
  height: 88px;
`;
