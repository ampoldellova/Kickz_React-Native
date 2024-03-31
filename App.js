import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from "native-base";
import { ModalPortal } from "react-native-modals";
import DrawerNavigation from "./navigation/DrawerNavigation";
import StackNavigator from "./navigation/StackNavigator";
import { UserContext } from "./UserContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NativeBaseProvider>
          <PaperProvider>
            <UserContext>
              <StackNavigator />
              <Toast />
              {/* <DrawerNavigation /> */}
              <ModalPortal />
            </UserContext>
          </PaperProvider>
        </NativeBaseProvider>
      </Provider>
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
