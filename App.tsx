import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-magnus";
import { SafeAreaView } from "react-native";
import { theme } from "./Theme";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import Routes from "./src/routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AuthProvider>
            <StatusBar backgroundColor="#214168" />
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}
