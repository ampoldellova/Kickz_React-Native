import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/User/ProfileScreen';
import CartScreen from '../screens/Cart/CartScreen';
import BrandScreen from '../screens/Admin/Brand/BrandScreen';
import BrandCreate from '../screens/Admin/Brand/BrandCreate';
import AddAddress from '../screens/AddAddress';
import AddressScreen from '../screens/AddressScreen';
import BrandUpdate from '../screens/Admin/Brand/BrandUpdate';
import ProductScreen from '../screens/Admin/Product/ProductScreen';
import ProductCreate from '../screens/Admin/Product/ProductCreate';
import ProductUpdate from '../screens/Admin/Product/ProductUpdate';
import ProductDetail from '../screens/Product/ProductDetail';
import EditProfile from '../screens/User/EditProfile';
import ConfirmationScreen from '../screens/Cart/ConfirmationScreen';
import OrderScreen from '../screens/Order/OrderScreen';
import UserScreen from '../screens/Admin/Users/UserScreen';
import UserUpdate from '../screens/Admin/Users/UserUpdate';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
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
                                <Ionicons name="cart-sharp" size={24} color="#0F0F0F" />
                            ) : (
                                <Ionicons name="cart-outline" size={24} color="black" />
                            ),
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />

                <Stack.Screen name="BrandCreate" component={BrandCreate} options={{ headerShown: false }} />
                <Stack.Screen name="BrandUpdate" component={BrandUpdate} options={({ route }) => ({ headerShown: route.params && route.params.showHeader ? route.params.showHeader : false })} />
                <Stack.Screen name="Brands" component={BrandScreen} options={{ headerShown: false }} />

                <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
                <Stack.Screen name="Addresses" component={AddressScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Products" component={ProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductCreate" component={ProductCreate} options={{ headerShown: false }} />
                <Stack.Screen name="ProductUpdate" component={ProductUpdate} options={({ route }) => ({ headerShown: route.params && route.params.showHeader ? route.params.showHeader : false })} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />

                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ConfirmOrder" component={ConfirmationScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Orders" component={OrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UserUpdate" component={UserUpdate} options={({ route }) => ({ headerShown: route.params && route.params.showHeader ? route.params.showHeader : false })} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})