import { TabIconContainer } from "@components/tab-icon-container";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrdersListScreen } from "@screens/user/orders-list";
import { UserProfile } from "@screens/user/profile";
import theme from "src/styles/theme";
import { Home } from "../screens/admin/home";

type UserNavbarRoutesProps = {
  UserOrders: undefined;
  AdminHome: undefined;
  UserProfile: undefined;
};

export type AdminNavigatorNavbarRoutesProps =
  NativeStackNavigationProp<UserNavbarRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<UserNavbarRoutesProps>();

export function AdminBottomTabRoutes() {
  const { goBack } = useNavigation();

  const renderCustomBackButton = () => (
    <MaterialIcons
      name="arrow-back-ios"
      size={24}
      color={theme.colors.WHITE}
      onPress={() => goBack()}
    />
  );

  const tabBarIconWidth = 28;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.GRAY_100,
        tabBarInactiveTintColor: theme.colors.ORANGE_200,
        headerLeft: renderCustomBackButton,
        title: "",
        tabBarStyle: {
          backgroundColor: theme.colors.GRAY_100,
          borderTopWidth: 0,
          borderColor: "transparent",
          paddingBottom: 20,
          paddingTop: 10,
          height: 80,
        },
        animation: "shift",
      }}
    >
      <Screen
        name="AdminHome"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo name="home" size={tabBarIconWidth} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="UserOrders"
        component={OrdersListScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo name="list" size={tabBarIconWidth} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo name="user" size={tabBarIconWidth} color={color} />
            </TabIconContainer>
          ),
        }}
      />
    </Navigator>
  );
}
