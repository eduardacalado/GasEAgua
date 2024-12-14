import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { ToastProvider } from 'react-native-toast-notifications';
// import { Provider } from 'react-redux';
import { ThemeProvider } from "styled-components/native";
import { RootRoutes } from "./routes/index";
// import { store } from './src/store';
import theme from "./styles/theme";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function App() {
  // <Provider store={store}>
  {
    /* <ToastProvider offset={80} > */
  }
  {
    /* </ToastProvider> */
  }
  {
    /* </Provider> */
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        <RootRoutes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
