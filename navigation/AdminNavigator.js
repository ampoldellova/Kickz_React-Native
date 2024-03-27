import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../screens/Admin/Dashboard/Dashboard";
import BrandScreen from "../screens/Admin/Brand/BrandScreen";
import BrandCreate from "../screens/Admin/Brand/BrandCreate";

export default function AdminNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      {/* 
      <Stack.Screen
        name="ProductsList"
        component={ProductsList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductCreate"
        component={ProductCreate}
        options={{
          title: "Add New Product",
          headerShown: true,
          headerStyle: { height: 40 },
          headerTitleStyle: { fontSize: 16, marginLeft: -15 },
        }}
      /> */}

      <Stack.Screen
        name="BrandScreen"
        component={BrandScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BrandCreate"
        component={BrandCreate}
        options={{
          title: "Add New Brand",
          headerShown: true,
          headerStyle: { height: 40 },
          headerTitleStyle: { fontSize: 16, marginLeft: -15 },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
