import { Link } from 'expo-router';
import { Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }}>
      <Text>Seja Bem-vindo!</Text>
      <Link href={"/login"}>Login</Link>
    </View>
  );
}
