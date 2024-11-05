import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import {
  Background, 
  BackgroundOrangeContainer, 
  WhiteContainer, 
  GreyButton, 
  GreyButtonText, 
  OrangeButton, 
  OrangeButtonText 
} from '../src/styled'

export default function HomeScreen() {
  const router = useRouter();

  const handlePressLogin = () => {
    router.push('/login');
  };

  const handlePressSignup = () => {
    router.push('/signup');
  };

  return (
    <Background>
      < BackgroundOrangeContainer
      colors={['#DB1A00', '#ED4200', '#FF6A00']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      />

        <WhiteContainer style={{elevation: 5}}>
          
          <View style={{gap: 15}}>

            <GreyButton onPress={handlePressSignup}>
                <GreyButtonText>
                  Cadastre-se
                </GreyButtonText>
            </GreyButton>
                        
            <TouchableOpacity onPress={handlePressLogin}>
              <OrangeButton
                colors={['#DB1A00', '#ED4200', '#FF6A00']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >

                <OrangeButtonText>
                  Entrar
                </OrangeButtonText>
              </OrangeButton>
            </TouchableOpacity>

          </View>

        </ WhiteContainer>

    </Background>
  );
}