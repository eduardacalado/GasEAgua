import { TouchableOpacity} from "react-native";
import * as S from './styles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();

    const handlePressWelcome = () => {
        router.push('/');
      };    


    return (
        <S.SafeAreaViewBackground>
            < S.LinearGradientContainer
            colors={['#DB1A00', '#ED4200', '#FF6A00']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            >
                <S.BackToWelcomeScreenButton onPress={handlePressWelcome}>
                    <MaterialIcons name="keyboard-arrow-left" size={45} color="white" />
                </S.BackToWelcomeScreenButton>  

            </S.LinearGradientContainer>
            
            

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
                    <S.LoginButton
                    colors={['#DB1A00', '#ED4200', '#FF6A00']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    >

                    <S.LoginButtonText>
                        Entrar
                    </S.LoginButtonText>
                    </S.LoginButton>
                </TouchableOpacity>

            </ S.Container>

        </S.SafeAreaViewBackground>
    )
}    