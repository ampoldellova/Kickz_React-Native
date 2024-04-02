import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  SafeAreaView,
  Image,
  ImageBackground,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import baseurl from "../../assets/common/baseurl";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../redux/UserReducer";

const ProfileScreen = () => {
  const dispatch = useDispatch();
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
            console.log(response.data.user);
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
    dispatch(cleanUser());
    Alert.alert("Logout", "You have been logged out");
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
  };

  // const gotoBrands = () => {
  //   // Navigate to the desired screen
  //   navigation.navigate("Brands");
  // };

  // const gotoProducts = () => {
  //   // Navigate to the desired screen
  //   navigation.navigate("Products");
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/background.jpg")}
        style={styles.coverPhoto}
      />
      <View style={styles.avatarContainer}>
        {user && user.image ? (
          <Image source={{ uri: user?.image }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../../assets/user.png")}
            style={styles.avatar}
          />
        )}

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={{ fontSize: 16, color: "#068FFF", fontWeight: "500" }}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("EditProfile");
            console.log("90");
          }}
          style={{
            width: 150,
            backgroundColor: "#99D5F3",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#0F0F0F",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          style={{
            width: 150,
            backgroundColor: "#F4DFC8",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#0F0F0F",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
      {user?.role !== "admin" ? (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("Order");
              console.log("90");
            }}
            style={{
              width: 150,
              backgroundColor: "#99D5F3",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#0F0F0F",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Your Orders
            </Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}

      {/* {user && user.role === "admin" ? (
        <>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={gotoBrands}
              style={{
                width: 150,
                backgroundColor: "#0F0F0F",
                borderRadius: 10,
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
                Brands
              </Text>
            </Pressable>

            <Pressable
              onPress={gotoProducts}
              style={{
                width: 150,
                backgroundColor: "#0F0F0F",
                borderRadius: 10,
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
                Products
              </Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => navigation.navigate("User")}
              style={{
                width: 150,
                backgroundColor: "#0F0F0F",
                borderRadius: 10,
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
                Users
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <></>
      )} */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 35,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
  },
});
