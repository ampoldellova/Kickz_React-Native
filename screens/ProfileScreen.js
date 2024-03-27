import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import baseurl from "../assets/common/baseurl";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          if (token) {
            const config = {
              headers: {
                Authorization: `${token}`,
              },
            };

            const response = await axios.get(`${baseurl}profile`, config);
            setUser(response.data.user);
          } else {
            console.log("Authentication token not found");
          }
        } catch (error) {
          console.log("Error fetching profile:", error);
        }
      };

      getProfile();
    }, [])
  );

  const handleLogout = async () => {
    AsyncStorage.removeItem("authToken");
    Alert.alert("Logout", "You have been logged out");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 30 }}>{user?.name}</Text>
      {/* {user && user?.image && (
        <Image source={{ uri: user.image }} style={styles.image} />
      )} */}
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
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
