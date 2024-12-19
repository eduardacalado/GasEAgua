import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Login } from "../screens/auth/login";
import { SignUp } from "../screens/auth/signup";
import { Platform } from "react-native";
import { WelcomeScreen } from "@screens/auth/welcome";

export type AuthRoutes = {
  login: undefined;
  signup: undefined;
  welcome: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        // headerShown: true,
        animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
      }}
    >
      <Screen name="welcome" component={WelcomeScreen} />
      <Screen name="signup" component={SignUp} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
