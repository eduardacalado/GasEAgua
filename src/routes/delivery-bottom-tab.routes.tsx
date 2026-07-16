import { TabIconContainer } from "@components/tab-icon-container";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserProfile } from "@screens/user/profile";
import theme from "src/styles/theme";
import { DeliveryHomeScreen } from "../screens/delivery/home";
import { DeliveryOrdersListScreen } from "../screens/delivery/orders-list";

type DeliveryNavbarRoutesProps = {
  DeliveryHome: undefined;
  DeliveryOrders: undefined;
  DeliveryProfile: undefined;
};

export type DeliveryNavigatorNavbarRoutesProps =
  NativeStackNavigationProp<DeliveryNavbarRoutesProps>;

const { Navigator, Screen } =
  createBottomTabNavigator<DeliveryNavbarRoutesProps>();

const TAB_BAR_ICON_SIZE = 24;

export function DeliveryBottomTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.ORANGE_200,
        tabBarInactiveTintColor: theme.colors.GRAY_300,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 4,
          marginBottom: 2,
        },
        title: "",
        tabBarStyle: {
          backgroundColor: theme.colors.GRAY_100,
          borderTopWidth: 1,
          borderTopColor: theme.colors.GRAY_200,
          paddingBottom: 16,
          paddingTop: 8,
          height: 88,
        },
        animation: "shift",
      }}
    >
      <Screen
        name="DeliveryHome"
        component={DeliveryHomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="home"
                size={TAB_BAR_ICON_SIZE}
                color={focused ? theme.colors.ORANGE_200 : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="DeliveryOrders"
        component={DeliveryOrdersListScreen}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="list"
                size={TAB_BAR_ICON_SIZE}
                color={focused ? theme.colors.ORANGE_200 : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="DeliveryProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Perfil",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="user"
                size={TAB_BAR_ICON_SIZE}
                color={focused ? theme.colors.ORANGE_200 : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
    </Navigator>
  );
}
