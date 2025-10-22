import { useAppSelector } from "@hooks/useAppSelector";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";

export type RootNavigatorRoutesProps = NativeStackNavigationProp<
  AuthRoutes & UserRoutes
>;

export function RootRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const authenticatedRoutes =
    role === "ADMIN" ? <AdminRoutes /> : <UserRoutes />;

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? authenticatedRoutes : <AuthRoutes />}
      </NavigationContainer>
    </>
  );
}
