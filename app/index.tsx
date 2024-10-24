import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/login');
  };

  return (
    <View style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white"
    }}>
      <LinearGradient
      style={{
        height: 370,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 92,
        borderBottomRightRadius: 92
      }}

      colors={['#DB1A00', '#ED4200', '#FF6A00']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      />

        <View style={{
          backgroundColor: "white",
          width: 325,
          height: 200,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          elevation: 5
        }}>
          
          <Text>Seja Bem-vindo!</Text>
          
            <TouchableOpacity onPress={handlePress}>

              <LinearGradient style={{
                padding: 10,
                width: 250,
                alignItems: 'center',
                borderRadius: 25
              }}

                colors={['#DB1A00', '#ED4200', '#FF6A00']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >

                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Entrar
                </Text>
              </LinearGradient>
            </TouchableOpacity>

        </View>
    </View>
  );
}