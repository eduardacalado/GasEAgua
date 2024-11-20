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

export const SignupButton = styled.TouchableOpacity`
    padding: 10px;
    width: 275px;
    align-items: center;
    border-radius: 25px;
    background-color: #D9D9D9;
`;

export const SignupButtonText = styled.Text`
    color: #373737;
    font-weight: bold;
`;

export const LoginButton = styled(LinearGradient)`
    padding: 10px;
    width: 275px;
    align-items: center;
    border-radius: 25px;
`;

export const LoginButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;