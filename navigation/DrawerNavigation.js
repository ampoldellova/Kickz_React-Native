import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminNavigator from './AdminNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={AdminNavigator} initialParams={{ screen: 'Home' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Dashboard" component={AdminNavigator} initialParams={{ screen: 'Dashboard' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Profile" component={AdminNavigator} initialParams={{ screen: 'Profile' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Brands" component={AdminNavigator} initialParams={{ screen: 'Brands' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Products" component={AdminNavigator} initialParams={{ screen: 'Products' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="User" component={AdminNavigator} initialParams={{ screen: 'User' }} options={{ headerShown: false, }} />
                <Drawer.Screen name="Order" component={AdminNavigator} initialParams={{ screen: 'Order' }} options={{ headerShown: false, }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}