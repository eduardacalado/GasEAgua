import { TabIconContainer } from "@components/tab-icon-container";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrdersListScreen } from "@screens/user/orders-list";
import { UserProfile } from "@screens/user/profile";
import theme from "src/styles/theme";
import { Home } from "../screens/admin/home";
import { AdminUsersListScreen } from "../screens/admin/users-list";

type UserNavbarRoutesProps = {
  UserOrders: undefined;
  AdminHome: undefined;
  AdminUsers: undefined;
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

  const tabBarIconWidth = 24;

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
        headerLeft: renderCustomBackButton,
        title: "",
        tabBarStyle: {
          backgroundColor: theme.colors.GRAY_100,
          borderTopWidth: 0,
          borderColor: "transparent",
          paddingBottom: 16,
          paddingTop: 8,
          height: 88,
        },
        animation: "shift",
      }}
    >
      <Screen
        name="AdminHome"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="home"
                size={tabBarIconWidth}
                color={focused ? theme.colors.WHITE : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="AdminUsers"
        component={AdminUsersListScreen}
        options={{
          tabBarLabel: "Clientes",
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="users"
                size={tabBarIconWidth}
                color={focused ? theme.colors.WHITE : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="UserOrders"
        component={OrdersListScreen}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="list"
                size={tabBarIconWidth}
                color={focused ? theme.colors.WHITE : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Perfil",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <TabIconContainer focused={focused}>
              <Entypo
                name="user"
                size={tabBarIconWidth}
                color={focused ? theme.colors.WHITE : theme.colors.GRAY_300}
              />
            </TabIconContainer>
          ),
        }}
      />
    </Navigator>
  );
}
