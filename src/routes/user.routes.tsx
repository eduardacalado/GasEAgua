import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { UserProfile } from "../screens/user/profile";
import { Home } from "../screens/user/home";
import { userCreateOrder } from "../screens/user/order";
import theme from "src/styles/theme";

export type UserRoutes = {
  userHome: undefined;
  schedule: undefined;
  userCreateOrder: undefined;
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
    <Navigator
      screenOptions={{
        headerLeft: renderCustomBackButton,
        title: "",
        headerTransparent: true,
        animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
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
  );
}