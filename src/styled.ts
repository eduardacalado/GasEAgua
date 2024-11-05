import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

export const Background = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: white;
`;

export const BackgroundOrangeContainer = styled(LinearGradient)`
    height: 370px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-bottom-left-radius: 92px;
    border-bottom-right-radius: 92px;
`;

export const WhiteContainer = styled.View`
    background-color: white;
    width: 325px;
    height: 200px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`;

export const GreyButton = styled.TouchableOpacity`
    padding: 10px;
    width: 275px;
    align-items: center;
    border-radius: 25px;
    background-color: #D9D9D9;
`;

export const GreyButtonText = styled.Text`
    color: '#373737';
    font-weight: bold;
`;

export const OrangeButton = styled(LinearGradient)`
    padding: 10px;
    width: 275px;
    align-items: center;
    border-radius: 25px;
`;

export const OrangeButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;