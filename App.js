import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <PaperProvider>
        <StackNavigator />
        </PaperProvider>
      </NativeBaseProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
