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
import { UserCreateOrder } from "../screens/user/create-order";
import { OrderAddress } from "../screens/user/order-address";
import { UserProfile } from "../screens/user/profile";
import { UserOrderDetailScreen } from "../screens/user/order-detail";
import { UserBottomTabRoutes } from "./user-bottom-tab.routes";

export type UserRoutes = {
  userHome: undefined;
  schedule: undefined;
  userCreateOrder: { type: ProductName };
  orderAddress: {
    type: ProductName;
    orderPayload: {
      items: Array<{
        id: number;
        type: string;
        name: string;
        quantity: number;
      }>;
      addons?: Array<{
        id: number;
        type: string;
        name: string;
        quantity: number;
      }>;
    };
    totalValue: string;
  };
  userProfile: undefined;
  orderDetail: { orderId: number };
};

export type UserNavigatorRoutesProps = NativeStackNavigationProp<UserRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<UserRoutes>();

export function UserRoutes() {
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
          name="userHome"
          component={UserBottomTabRoutes}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Screen name="userCreateOrder" component={UserCreateOrder} />
        <Screen name="orderAddress" component={OrderAddress} />
        <Screen name="userProfile" component={UserProfile} />
        <Screen name="orderDetail" component={UserOrderDetailScreen} />
      </Navigator>
    </LinearGradientBackground>
  );
}
