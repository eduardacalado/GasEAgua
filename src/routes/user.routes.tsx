import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import theme from "src/styles/theme";
import { ProductName } from "src/types/stock";
import { Home } from "../screens/user/home";
import { userCreateOrder } from "../screens/user/order";
import { UserProfile } from "../screens/user/profile";

export type UserRoutes = {
  userHome: undefined;
  schedule: undefined;
  userCreateOrder: { type: ProductName };
  userProfile: undefined;
};

export type UserNavigatorRoutesProps = NativeStackNavigationProp<UserRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<UserRoutes>();

export function UserRoutes() {
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
    <LinearGradientBackground>
      <Navigator
        screenOptions={{
          headerLeft: renderCustomBackButton,
          headerShown: false,
          title: "",
          headerTransparent: true,
          animation: Platform.OS === "android" ? "slide_from_right" : "default",
          animationDuration: 50000,
          orientation: "portrait_up",
        }}
      >
        <Screen
          name="userHome"
          component={Home}
          options={{ headerShown: false }}
        />
        <Screen name="userCreateOrder" component={userCreateOrder} />
        <Screen name="userProfile" component={UserProfile} />
      </Navigator>
    </LinearGradientBackground>
  );
}
