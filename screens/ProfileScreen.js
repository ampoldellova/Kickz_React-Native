import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    AsyncStorage.removeItem("authToken");
    Alert.alert("Logout");
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Pressable
        onPress={handleLogout}
        style={{
          width: 200,
          backgroundColor: "#0F0F0F",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
