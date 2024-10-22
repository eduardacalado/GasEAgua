import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
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
          
          <TouchableOpacity>
            <Link href={"/login"}>Login</Link>
          </TouchableOpacity>

        </View>
    </View>
  );
}