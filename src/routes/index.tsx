import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { authActions } from "@store/modules/auth/slice";
import { userActions } from "@store/modules/user/slice";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { authSessionStorage } from "src/libs/storage/authSessionStorage";
import { AdminRoutes } from "./admin.routes";
import { AuthRoutes } from "./auth.routes";
import { DeliveryRoutes } from "./delivery.routes";
import { UserRoutes } from "./user.routes";

export type RootNavigatorRoutesProps = NativeStackNavigationProp<
  AuthRoutes & UserRoutes
>;

export function RootRoutes() {
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedSession = await authSessionStorage.get();

        if (storedSession) {
          dispatch(userActions.saveUser(storedSession));
          dispatch(authActions.updateAuthStore({ isAuthenticated: true }));
        }
      } catch (error) {
        await authSessionStorage.clear();
      } finally {
        setIsRestoringSession(false);
      }
    }

    restoreSession();
  }, []);

  if (isRestoringSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ED4200" />
      </View>
    );
  }

  function getAuthenticatedRoutes() {
    if (role === "ADMIN") return <AdminRoutes />;
    if (role === "DELIVERY_MAN") return <DeliveryRoutes />;
    return <UserRoutes />;
  }

  const authenticatedRoutes = getAuthenticatedRoutes();

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? authenticatedRoutes : <AuthRoutes />}
      </NavigationContainer>
    </>
  );
}
