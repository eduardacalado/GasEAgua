import { LinearGradientBackground } from "@components/LinearGradientBackground";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import theme from "src/styles/theme";
import { DeliveryOrderDetailScreen } from "../screens/delivery/order-detail";
import { UserProfile } from "../screens/user/profile";
import { DeliveryBottomTabRoutes } from "./delivery-bottom-tab.routes";

export type DeliveryRoutes = {
  deliveryHome: undefined;
  orderDetail: { orderId: number };
  userProfile: undefined;
};

export type DeliveryNavigatorRoutesProps =
  NativeStackNavigationProp<DeliveryRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<DeliveryRoutes>();

export function DeliveryRoutes() {
  const { goBack } = useNavigation();

  const renderCustomBackButton = () => (
    <MaterialIcons
      name="arrow-back-ios"
      size={24}
      color={theme.colors.WHITE}
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
          name="deliveryHome"
          component={DeliveryBottomTabRoutes}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Screen name="orderDetail" component={DeliveryOrderDetailScreen} />
        <Screen name="userProfile" component={UserProfile} />
      </Navigator>
    </LinearGradientBackground>
  );
}
