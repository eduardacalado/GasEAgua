import theme from "src/styles/theme";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

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
  max-height: 90%;
`;

export const ModalTitle = styled.Text`
  color: ${theme.colors.GRAY_600};
  font-size: ${theme.font.size.m6};
  font-weight: ${theme.font.weight.bold};
`;

export const FieldLabel = styled.Text`
  color: ${theme.colors.GRAY_300};
  font-size: ${theme.font.size.m4};
  font-weight: ${theme.font.weight.semibold};
`;

export const FieldInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.GRAY_100};
  padding-horizontal: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.GRAY_600};
`;

export const NotesInput = styled.TextInput.attrs({
  autoCapitalize: "none",
})`
  min-height: 80px;
  border-radius: 10px;
  background-color: ${theme.colors.GRAY_100};
  padding: 16px;
  font-size: 16px;
  color: ${theme.colors.GRAY_600};
  text-align-vertical: top;
`;

export const SortControlShell = styled.View`
  min-height: 50px;
  border-radius: 10px;
  background-color: ${theme.colors.GRAY_100};
  padding-horizontal: 12px;
  justify-content: center;
`;

export const ModalActionsRow = styled.View`
  flex-direction: row;
  gap: ${theme.size.m3};
`;

export const dropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
  },
  placeholder: {
    fontSize: 16,
    color: theme.colors.GRAY_300,
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.GRAY_600,
  },
  icon: {
    width: 20,
    height: 20,
  },
  menuContainer: {
    borderRadius: 12,
    backgroundColor: theme.colors.WHITE,
    marginTop: 6,
    paddingVertical: 4,
    elevation: 8,
  },
});
