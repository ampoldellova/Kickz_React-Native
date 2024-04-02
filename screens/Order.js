import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
      console.log(data.order);
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
      <Text style={styles.orderDate}>ORDER ID: {item._id}</Text>
      <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
      <Text style={styles.orderTotal}>₱{item.totalPrice}</Text>
      <Text style={styles.orderStatus}>{`Status: ${item.orderStatus}`}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={order}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    color: "grey",
    marginTop: 5,
  },
});

export default Order;
