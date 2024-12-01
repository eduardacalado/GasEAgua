import { TouchableOpacity} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradientBackground } from '../../components/LinearGradientBackground/index';
import * as S from './styles'
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Login() {
    const router = useRouter();

    const handlePressHome = () => {
      router.push('../home');
    };
  
    return (
        <S.SafeAreaViewContainer>
            <StatusBar style='light' />

            <LinearGradientBackground />
             
            <S.Container>

                <S.InputArea>
                    <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Email"/>
                </S.InputArea>

                <S.InputArea>
                    <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Senha"/>
                </S.InputArea>
                                
                <TouchableOpacity onPress={handlePressHome}>
                    <S.LoginButton 
                            colors={['#DB1A00', '#ED4200', '#FF6A00']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}>
                        <S.LoginButtonText>
                            Entrar
                        </S.LoginButtonText>
                    </ S.LoginButton>
                </TouchableOpacity>

            </ S.Container>

        </S.SafeAreaViewContainer>
    )
}    


