import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/User/ProfileScreen';
import CartScreen from '../screens/Cart/CartScreen';
import BrandScreen from '../screens/Admin/Brand/BrandScreen';
import BrandCreate from '../screens/Admin/Brand/BrandCreate';
import AddAddress from '../screens/AddAddress';
import AddressScreen from '../screens/AddressScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminNavigator from './AdminNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={AdminNavigator} initialParams={{ screen: 'Home' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Profile" component={AdminNavigator} initialParams={{ screen: 'Profile' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Brands" component={AdminNavigator} initialParams={{ screen: 'Brands' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Products" component={AdminNavigator} initialParams={{ screen: 'Products' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="User" component={AdminNavigator} initialParams={{ screen: 'User' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Order" component={AdminNavigator} initialParams={{ screen: 'Order' }} options={{ headerShown: false, }} />
                {/* <Drawer.Screen name="Cart" component={Main} initialParams={{ screen: 'Cart' }} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}