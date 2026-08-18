import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { WelcomeScreen } from "@screens/auth/welcome";
import { Platform } from "react-native";
import { Login } from "../screens/auth/login";
import { SignUp } from "../screens/auth/signup";

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
        headerShown: false,
        title: "",
        animation: Platform.OS === "android" ? "slide_from_right" : "default",
        orientation: "portrait_up",
      }}
    >
      <Screen name="welcome" component={WelcomeScreen} />
      <Screen name="signup" component={SignUp} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
