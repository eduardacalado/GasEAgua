import styled from "styled-components/native";
import theme from "src/styles/theme";

export const Container = styled.View`
  flex: 1;
  padding: ${theme.size.m7};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${theme.colors.WHITE};
  font-size: ${theme.font.size.m7};
  font-weight: ${theme.font.weight.bold};
  margin-top: ${theme.size.m6};
  margin-bottom: ${theme.size.m2};
`;

export const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${theme.font.size.m3};
  margin-bottom: ${theme.size.m6};
`;

export const FormCard = styled.View`
  background-color: ${theme.colors.WHITE};
  border-radius: ${theme.size.m5};
  padding: ${theme.size.m6};
  gap: ${theme.size.m4};
  elevation: 2;
  shadow-color: ${theme.colors.GRAY_700};
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SavedHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.size.m2};
`;

export const SavedBadge = styled.View`
  background-color: rgba(104, 211, 145, 0.2);
  border-radius: 12px;
  padding: 4px 10px;
`;

export const SavedBadgeText = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m2};
  font-weight: ${theme.font.weight.bold};
`;

export const InfoBlock = styled.View`
  gap: ${theme.size.m1};
`;

export const FieldLabel = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
  margin-bottom: ${theme.size.m1};
`;

export const InfoValue = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
  background-color: ${theme.colors.GRAY_100};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m3} ${theme.size.m4};
`;

export const FieldInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  background-color: ${theme.colors.GRAY_100};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m3} ${theme.size.m4};
  font-size: ${theme.font.size.m4};
  color: ${theme.colors.GRAY_700};
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
  margin-top: ${theme.size.m2};
`;
