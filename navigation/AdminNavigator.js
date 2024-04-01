import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../screens/Admin/Dashboard/Dashboard";
import BrandScreen from "../screens/Admin/Brand/BrandScreen";
import BrandCreate from "../screens/Admin/Brand/BrandCreate";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import BrandUpdate from "../screens/Admin/Brand/BrandUpdate";
import ProductScreen from "../screens/Admin/Product/ProductScreen";
import ProductCreate from "../screens/Admin/Product/ProductCreate";
import ProductUpdate from "../screens/Admin/Product/ProductUpdate";
import UserScreen from "../screens/Admin/Users/UserScreen";
import UserUpdate from "../screens/Admin/Users/UserUpdate";
import EditProfile from "../screens/User/EditProfile";
import ProductDetail from "../screens/Product/ProductDetail";
import AddAddress from "../screens/AddAddress";
import AddressScreen from "../screens/AddressScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default function AdminNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BrandCreate"
        component={BrandCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrandUpdate"
        component={BrandUpdate}
        options={({ route }) => ({
          headerShown:
            route.params && route.params.showHeader
              ? route.params.showHeader
              : false,
        })}
      />
      <Stack.Screen
        name="Brands"
        component={BrandScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductCreate"
        component={ProductCreate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductUpdate"
        component={ProductUpdate}
        options={({ route }) => ({
          headerShown:
            route.params && route.params.showHeader
              ? route.params.showHeader
              : false,
        })}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserUpdate"
        component={UserUpdate}
        options={({ route }) => ({
          headerShown:
            route.params && route.params.showHeader
              ? route.params.showHeader
              : false,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
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
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
