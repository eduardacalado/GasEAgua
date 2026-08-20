import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Hero = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-horizontal: ${theme.size.m7};
  padding-bottom: ${theme.size.m6};
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-weight: ${theme.font.weight.extrabold};
  font-size: ${theme.font.size.m9};
  text-align: left;
`;

export const Sheet = styled.View`
  background-color: ${theme.colors.WHITE};
  border-top-left-radius: ${theme.size.m10};
  border-top-right-radius: ${theme.size.m10};
  align-items: stretch;
  padding-horizontal: ${theme.size.m7};
  padding-top: ${theme.size.m8};
  padding-bottom: ${theme.size.m10};
`;

export const FormStack = styled.View`
  width: 100%;
  gap: ${theme.size.m4};
`;

export const FieldGroup = styled.View`
  width: 100%;
  gap: ${theme.size.m1};
`;

export const FieldLabel = styled.Text`
  color: ${theme.colors.ORANGE_200};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const InputRow = styled.View`
  width: 100%;
  min-height: 44px;
  align-items: center;
  flex-direction: row;
  gap: ${theme.size.m2};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.GRAY_200};
`;

export const Input = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  flex: 1;
  font-size: ${theme.font.size.m4};
  color: ${theme.colors.GRAY_700};
  font-weight: ${theme.font.weight.medium};
  padding-vertical: ${theme.size.m2};
`;

export const LabelError = styled.Text`
  align-self: flex-start;
  color: ${theme.colors.RED_100};
  font-size: ${theme.font.size.m3};
`;

export const SignupRow = styled.View`
  margin-top: ${theme.size.m2};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.size.m1};
`;

export const SignupHint = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.regular};
`;
