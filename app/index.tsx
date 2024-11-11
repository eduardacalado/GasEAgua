import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import * as S from './styles'

export default function HomeScreen() {
  const router = useRouter();

  const handlePressLogin = () => {
    router.push('/login');
  };

  const handlePressSignup = () => {
    router.push('/signup');
  };

  return (
    <S.SafeAreaViewBackground>
      < S.LinearGradientContainer
      colors={['#DB1A00', '#ED4200', '#FF6A00']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      />

        <S.Container>

          <S.SignupButton onPress={handlePressSignup}>
            <S.SignupButtonText>
              Cadastre-se
            </S.SignupButtonText>
          </S.SignupButton>
                        
          <TouchableOpacity onPress={handlePressLogin}>
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
  );
}