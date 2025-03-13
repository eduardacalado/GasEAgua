import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { RootRoutes } from "./routes/index";
import theme from "./styles/theme";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";

export default function App() {
  console.log(API_URL);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" translucent />
          <RootRoutes />
        </ThemeProvider>
      </GestureHandlerRootView>
      <Toast />
    </Provider>
  );
}
