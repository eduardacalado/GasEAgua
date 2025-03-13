import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Login } from "../screens/auth/login";
import { SignUp } from "../screens/auth/signup";
import { Platform } from "react-native";
import { WelcomeScreen } from "@screens/auth/welcome";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "src/styles/theme";

export type AuthRoutes = {
  login: undefined;
  signup: undefined;
  welcome: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  const { goBack } = useNavigation();

  const renderCustomBackButton = () => (
    <MaterialIcons
      name="arrow-back-ios"
      size={24}
      color={theme.colors.background.white}
      onPress={() => goBack()}
    />
  );
  return (
    <Navigator
      screenOptions={{
        headerLeft: renderCustomBackButton,
        title: "",
        headerTransparent: true,
        animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
        orientation: "portrait_up",
      }}
    >
      <Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Screen name="signup" component={SignUp} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
