import { TouchableOpacity} from "react-native";
import * as S from './styles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradientContainer } from '../../components/linear-gradient-container';

export default function SignUp() {

    return (
        <S.SafeAreaViewBackground>

            < LinearGradientContainer/>          
            

            <S.Container>

                <S.InputArea>
                    <MaterialIcons name="person" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Nome"/>
                </S.InputArea>

                <S.InputArea>
                <MaterialCommunityIcons name="map-marker" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Endereço"/>
                </S.InputArea>

                <S.InputArea>
                <MaterialCommunityIcons name="phone" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Número de telefone"/>
                </S.InputArea>

                <S.InputArea>
                    <MaterialIcons name="alternate-email" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Email"/>
                </S.InputArea>

                <S.InputArea>
                    <MaterialIcons name="lock-outline" size={20} color="#7e7e7e" />
                    <S.Input placeholder="Senha"/>
                </S.InputArea>
                                
                <TouchableOpacity>
                    <S.SignUpButton
                    colors={['#DB1A00', '#ED4200', '#FF6A00']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    >
                        <S.SignUpButtonText>
                            Cadastrar
                        </S.SignUpButtonText>
                    </S.SignUpButton>
                </TouchableOpacity>

            </ S.Container>

        </S.SafeAreaViewBackground>
    )
}    