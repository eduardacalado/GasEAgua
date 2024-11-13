import { TouchableOpacity} from "react-native";
import * as S from './styles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradientContainer } from '../../components/linear-gradient-container';
import { LoginButton } from '../../components/login-buttton';

export default function Login() {

    return (
        <S.SafeAreaViewBackground>

            <LinearGradientContainer />
            
            

            <S.Container>

                <S.InputArea>
                    <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Email"/>
                </S.InputArea>

                <S.InputArea>
                    <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Senha"/>
                </S.InputArea>
                                
                <TouchableOpacity>
                    <LoginButton>
                        <S.LoginButtonText>
                            Entrar
                        </S.LoginButtonText>
                    </LoginButton>
                </TouchableOpacity>

            </ S.Container>

        </S.SafeAreaViewBackground>
    )
}    


