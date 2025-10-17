import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import { config } from "./config/environment";
import { RootRoutes } from "./routes/index";
import { store } from "./store";
import theme from "./styles/theme";

export default function App() {
  console.log(config.API_URL);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
            <StatusBar style="light" translucent />
            <RootRoutes />
          </ThemeProvider>
        </GestureHandlerRootView>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}
