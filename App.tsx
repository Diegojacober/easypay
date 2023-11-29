import React from "react";

import { StatusBar } from "expo-status-bar";
import { Text, ThemeProvider } from "react-native-magnus";
import { SafeAreaView, View } from "react-native";
import { theme } from "./Theme";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/services/queryClient";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#3883BB" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text2Style={{
        fontSize: 14,
        fontWeight: "600",
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "500",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#F00" }}
      text2Style={{
        fontSize: 14,
        fontWeight: "600",
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "500",
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <StatusBar backgroundColor="#214168" />

              <Routes />
            </NavigationContainer>
            <Toast config={toastConfig} />
          </SafeAreaView>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
