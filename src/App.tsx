import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NetworkLoggerButton,
  NetworkLoggerModal,
} from "react-native-httptrace";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import { RootRoutes } from "./routes/index";
import { store } from "./store";
import theme from "./styles/theme";

export default function App() {
  const [isNetworkModalVisible, setIsNetworkModalVisible] = useState(false);

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
            <NetworkLoggerButton
              onPress={() => setIsNetworkModalVisible(true)}
            />
            <NetworkLoggerModal
              visible={isNetworkModalVisible}
              onClose={() => setIsNetworkModalVisible(false)}
              title="HTTP Trace Debug"
              showCloseButton={true}
            />
          </>
        )}
      </Provider>
    </GestureHandlerRootView>
  );
}
