import * as S from './styles'
import { LinearGradientContainer } from '../../components/LinearGradientContainer/index';
import { TouchableOpacity } from 'react-native';

export default function home() {

    return (
        <S.SafeAreaViewBackground>

            <LinearGradientContainer />     
            
            <TouchableOpacity>
                <S.GasButton source={require("../../assets/images/gasLogo.png")}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <S.AguaButton source={require("../../assets/images/aguaLogo.png")}/>
            </TouchableOpacity>

            <S.Title>
                Olá, Eduardo!
            </S.Title>

            <S.SubTitle>
                O que gostaria de pedir?
            </S.SubTitle>
            
        </S.SafeAreaViewBackground>
    )
}    