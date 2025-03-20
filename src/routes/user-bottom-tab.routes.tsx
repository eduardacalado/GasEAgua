import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrdersList } from "@screens/user/orders-list";
import { UserProfile } from "@screens/user/profile";
import theme from "src/styles/theme";
import { Home } from "../screens/user/home";

type UserNavbarRoutesProps = {
  UserOrders: undefined;
  UserHome: undefined;
  UserProfile: undefined;
};

export type AdminNavigatorNavbarRoutesProps =
  NativeStackNavigationProp<UserNavbarRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<UserNavbarRoutesProps>();

export function UserBottomTabRoutes() {
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
        tabBarActiveTintColor: theme.colors.ORANGE_200,
        tabBarInactiveTintColor: theme.colors.GRAY_100,
        headerLeft: renderCustomBackButton,
        title: "",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          paddingBottom: 20,
          paddingTop: 10,
          height: 88,
        },
        animation: "shift",
      }}
    >
      <Screen
        name="UserHome"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={tabBarIconWidth} color={color} />
          ),
        }}
      />
      <Screen
        name="UserOrders"
        component={OrdersList}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="clock" size={tabBarIconWidth} color={color} />
          ),
        }}
      />
      <Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={tabBarIconWidth} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
