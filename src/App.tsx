import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { RootRoutes } from "./routes/index";
import theme from "./styles/theme";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" translucent />
          <RootRoutes />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
