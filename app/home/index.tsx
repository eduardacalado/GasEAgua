import * as S from './styles'
import { LinearGradientBackground } from '../../components/LinearGradientBackground/index';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();

    const handlePressOrder = () => {
       router.push('../order');
    };

    return (
        <S.SafeAreaViewContainer>
            <StatusBar style='light' />

            <LinearGradientBackground />     
            
            <TouchableOpacity onPress={handlePressOrder}>
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