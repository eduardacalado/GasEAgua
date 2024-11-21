import styled from "styled-components/native";
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

export const SafeAreaViewBackground = styled.SafeAreaView`
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: white;
`;

export const Container = styled.View`
    background-color: white;
    width: 325px;
    height: 400px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    elevation: 5;
`;