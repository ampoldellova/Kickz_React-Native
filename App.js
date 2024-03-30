import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";
import { ModalPortal } from "react-native-modals";
import DrawerNavigation from "./navigation/DrawerNavigation";
import StackNavigator from "./navigation/StackNavigator";
import { UserContext } from "./UserContext";

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <PaperProvider>
          <UserContext>
            <StackNavigator />
            {/* <DrawerNavigation /> */}
            <ModalPortal />
          </UserContext>
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
