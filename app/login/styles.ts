import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

export const SafeAreaViewBackground = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: white;
`;

export const Container = styled.View`
    background-color: white;
    width: 325px;
    height: 200px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    elevation: 5;
`;

export const InputArea = styled.View`
    padding: 10px;
    width: 275px;
    align-items: center;
    border-radius: 25px;
    background-color: #D9D9D9;
    flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
`;

export const LoginButton = styled(LinearGradient)`
    padding: 10px;
    width: 125px;
    align-items: center;
    border-radius: 25px;
`;

export const LoginButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;