import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  HttpTraceBadge,
  HttpTraceButton,
  HttpTraceShake,
  HttpTraceStatusIndicator,
  HttpTraceToast,
  useHttpTrace,
} from "react-native-httptrace";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import { RootRoutes } from "./routes/index";
import { store } from "./store";
import theme from "./styles/theme";

export default function App() {
  useHttpTrace();

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

        {__DEV__ && (
          <>
            <HttpTraceButton />
            <HttpTraceShake />
            <HttpTraceBadge
              position="top-right"
              showOnlyErrors={false}
              autoHide={false}
            />
            <HttpTraceStatusIndicator
              showPendingCount={true}
              showErrorCount={true}
              compact={true}
              color="#32CD32"
              backgroundColor="rgba(50,205,50,0.1)"
            />
            <HttpTraceToast
              position="top"
              duration={3000}
              showOnlyErrors={false}
              maxWidth={350}
            />
          </>
        )}
      </Provider>
    </GestureHandlerRootView>
  );
}
