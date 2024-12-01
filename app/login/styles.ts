import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../../styles/theme"

export const SafeAreaViewContainer = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: ${theme.colors.background.white};
`;

export const Container = styled.View`
    background-color: ${theme.colors.background.white};
    width: 325px;
    height: 210px;
    border-radius: ${theme.size.m6};
    align-items: center;
    justify-content: center;
    gap: ${theme.size.m4};
    elevation: 5;
`;

export const InputArea = styled.View`
    padding: ${theme.size.m2};
    width: ${theme.size.m15};
    align-items: center;
    border-radius: ${theme.size.m7};
    background-color: ${theme.colors.input.background};
    flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.size.m4};
  margin-left: ${theme.size.m2};
`;

export const LoginButton = styled(LinearGradient)`
    padding: ${theme.size.m2};
    width: 125px;
    align-items: center;
    border-radius: ${theme.size.m7};
`;

export const LoginButtonText = styled.Text`
    color: ${theme.colors.button.primary.text};
    font-weight: ${theme.font.weight.bold};
`;