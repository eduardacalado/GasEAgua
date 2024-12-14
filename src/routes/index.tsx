import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootNavigatorRoutesProps = NativeStackNavigationProp<
  AuthRoutes & UserRoutes
>;

export function RootRoutes() {
  const isAuthenticated = true;

  const authenticatedRoutes = <UserRoutes />;

  return (
    <NavigationContainer>
      {isAuthenticated ? authenticatedRoutes : <AuthRoutes />}
    </NavigationContainer>
  );
}
