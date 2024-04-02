import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseurl from "../assets/common/baseurl";
import { useNavigation } from "@react-navigation/native";

const Order = () => {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const [token, setToken] = useState("");

  const getOrder = async () => {
    try {
      const tok = await AsyncStorage.getItem("authToken");
      setToken(tok);

      const config = {
        headers: {
          Authorization: `${tok}`,
        },
      };

      const { data } = await axios.get(`${baseurl}get/single/order`, config);
      setOrder(data.order);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrder();
    }, [])
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        navigation.navigate("SingleOrder", item);
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>Order ID: {item._id}</Text>
      <Text style={{ fontSize: 14, fontStyle: "italic", marginTop: 5 }}>Date Ordered: {formatDate(item.createdAt)}</Text>
      <Text style={{ fontSize: 14, fontStyle: "italic", marginTop: 5 }}>Order Total: ₱ {item.totalPrice}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 14, fontStyle: "italic", marginTop: 5 }}>Status:</Text>
        <Text
          style={{
            color: item.orderStatus === "Processing" ? "#FDA403" :
              item.orderStatus === "Cancelled" ? "#FF5733" :
                item.orderStatus === "Order Delivered" ? "#40A2E3" :
                  item.orderStatus === "Order Received" ? "#87A922" :
                    "#000",
            fontSize: 14,
            fontWeight: "bold",
            borderRadius: 30,
            padding: 5
          }}
        >
          {item.orderStatus}
        </Text>


      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require("../assets/homeBackground.png")} style={styles.background}>
      <View style={{ padding: 10 }}>
        <Text style={{ marginTop: 40, fontWeight: "bold", fontSize: 20, textAlign: "center" }}>Your orders</Text>
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    height: "100%"
  }
});

export default Order;
