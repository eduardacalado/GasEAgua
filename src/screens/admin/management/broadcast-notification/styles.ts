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
  keyboardShouldPersistTaps: "handled",
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

export const FieldLabel = styled.Text`
  color: ${theme.colors.GRAY_700};
  font-size: ${theme.font.size.m3};
  font-weight: ${theme.font.weight.semibold};
`;

export const FieldInput = styled.TextInput`
  background-color: ${theme.colors.GRAY_100};
  border-radius: ${theme.size.m2};
  padding: ${theme.size.m3} ${theme.size.m4};
  font-size: ${theme.font.size.m4};
  color: ${theme.colors.GRAY_700};
`;

export const MessageInput = styled(FieldInput)`
  min-height: 120px;
  text-align-vertical: top;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${theme.colors.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${theme.size.m6};
  gap: ${theme.size.m4};
`;

export const ModalTitle = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const ModalMessage = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
`;

export const ModalActionsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;
