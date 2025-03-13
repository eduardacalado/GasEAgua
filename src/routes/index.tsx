import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "@hooks/useAppSelector";

export type RootNavigatorRoutesProps = NativeStackNavigationProp<
  AuthRoutes & UserRoutes
>;

export function RootRoutes() {
  const {isAuthenticated} = useAppSelector(state => state.auth);

  const {user: {isAdmin}} = useAppSelector(state => state.user);

  // const authenticatedRoutes = !isAdmin && <UserRoutes />;
  const authenticatedRoutes = <UserRoutes />;

  return (
    <NavigationContainer>
      {isAuthenticated ? authenticatedRoutes : <AuthRoutes />}
    </NavigationContainer>
  );
}
