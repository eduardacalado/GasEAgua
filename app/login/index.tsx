import { TouchableOpacity} from "react-native";
import * as S from './styles'

export default function Login() {
    return (
        <S.SafeAreaViewBackground>
      < S.LinearGradientContainer
      colors={['#DB1A00', '#ED4200', '#FF6A00']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      />

        <S.Container style={{elevation: 5}}>

          <S.InputArea placeholder="Email"/>

          <S.InputArea placeholder="Senha"/>
                        
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