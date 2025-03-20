import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { WelcomeScreen } from "@screens/auth/welcome";
import { Platform } from "react-native";
import theme from "src/styles/theme";
import { RootNavigatorRoutesProps } from ".";
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
  const { goBack } = useNavigation<RootNavigatorRoutesProps>();

  const renderCustomBackButton = () => (
    <MaterialIcons
      name="arrow-back-ios"
      size={24}
      color={theme.colors.WHITE}
      onPress={() => goBack()}
    />
  );

  return (
    <Navigator
      screenOptions={{
        headerLeft: renderCustomBackButton,
        title: "",
        headerTransparent: true,
        animation: Platform.OS === "android" ? "slide_from_right" : "default",
        orientation: "portrait_up",
      }}
    >
      <Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Screen name="signup" component={SignUp} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
