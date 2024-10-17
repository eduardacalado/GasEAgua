import { Link } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#FEFEFE",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingBottom: 120,
          paddingTop: 200,
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Image
          source={require("../assets/gas-e-agua-logo.png")}
          style={{ height: 155, width: 301 }}
        />
        <View style={{ gap: 20, width: "100%" }}>
          <Link href={{ pathname: "./login" }} asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "#ff914d",
                padding: 12,
                borderRadius: 99,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="login" asChild>
            <TouchableOpacity
              style={{
                borderColor: "#16b6ad",
                borderWidth: 4,
                padding: 12,
                borderRadius: 99,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#16b6ad", fontSize: 20, fontWeight: "bold" }}
              >
                Cadastrar-se
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
