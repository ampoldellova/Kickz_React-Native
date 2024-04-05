import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/User/ProfileScreen";
import CartScreen from "../screens/Cart/CartScreen";
import AddAddress from "../screens/AddAddress";
import AddressScreen from "../screens/AddressScreen";
import ProductDetail from "../screens/Product/ProductDetail";
import EditProfile from "../screens/User/EditProfile";
import ConfirmationScreen from "../screens/Cart/ConfirmationScreen";
import OrderSuccess from "../screens/Order/OrderSuccess";
import { useSelector } from "react-redux";
import Order from "../screens/Order";
import SingleOrder from "../screens/SingleOrder";
import 'react-native-gesture-handler'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#0F0F0F" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user-circle" size={24} color="#0F0F0F" />
              ) : (
                <FontAwesome name="user-circle-o" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="cart-sharp" size={24} color="#0F0F0F" />
                  {/* {cart.length === 0 ? (
                    <></>
                  ) : (
                    <Text style={{ fontSize: 10 }}>{cart.length}</Text>
                  )} */}
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="cart-outline" size={24} color="black" />
                  {/* {cart.length === 0 ? (
                    <></>
                  ) : (
                    <Text style={{ fontSize: 10 }}>{cart.length}</Text>
                  )} */}
                </View>
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addresses"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleOrder"
          component={SingleOrder}
          options={({ route }) => ({
            headerShown:
              route.params && route.params.showHeader
                ? route.params.showHeader
                : false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
