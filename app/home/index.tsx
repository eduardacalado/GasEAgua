import * as S from './styles'
import { LinearGradientBackground } from '../../components/LinearGradientBackground/index';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

    return (
        <S.SafeAreaViewContainer>
            <StatusBar style='light' />

            <LinearGradientBackground />     
            
            <TouchableOpacity>
                <S.GasButton source={require("../../assets/images/gasLogo.png")}/>
                <S.GasButtonText>
                    Pedir Gás
                </S.GasButtonText>
            </TouchableOpacity>

            <TouchableOpacity>
                <S.WaterButton source={require("../../assets/images/aguaLogo.png")}/>
                <S.WaterButtonText>
                    Pedir Água
                </S.WaterButtonText>
            </TouchableOpacity>

            <S.Title>
                Olá, Eduardo!
            </S.Title>

            <S.SubTitle>
                O que gostaria de pedir?
            </S.SubTitle>
            
        </S.SafeAreaViewContainer>
    )
}    