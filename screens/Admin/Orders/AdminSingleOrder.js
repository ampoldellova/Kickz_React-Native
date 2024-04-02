import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import baseurl from "../../../assets/common/baseurl";

const AdminSingleOrder = ({ route }) => {
  const navigation = useNavigation();

  console.log(route.params);
  const {
    createdAt,
    orderStatus,
    paymentMethod,
    products,
    shippingAddress,
    totalPrice,
    user,
    _id,
  } = route.params;

  const updateOrderStatus = async (status) => {
    await axios.put(`${baseurl}update/status`, {
      item: _id,
      orderStatus: status,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text style={styles.subHeader}>Products</Text>
      {products.map((product, index) => (
        <View key={index} style={styles.productContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text>Price: ${product.price}</Text>
            <Text>Quantity: {product.quantity}</Text>
          </View>
        </View>
      ))}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Shipping Address</Text>
        <Text>{shippingAddress.name}</Text>
        <Text>
          {shippingAddress.houseNo}, {shippingAddress.street}
        </Text>
        <Text>{shippingAddress.landmark}</Text>
        <Text>{shippingAddress.postalCode}</Text>
        <Text>Mobile: {shippingAddress.mobileNo}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subHeader}>Order Information</Text>
        <Text>Order ID: {_id}</Text>
        <Text>Date: {new Date(createdAt).toLocaleDateString()}</Text>
        <Text>Status: {orderStatus}</Text>
        <Text>Payment Method: {paymentMethod}</Text>
        <Text>Total Price: ${totalPrice}</Text>
      </View>
      {orderStatus === "Processing" ? (
        <View style={styles.updateButton}>
          <Button
            title="Update Status to Confirmed"
            onPress={() => {
              updateOrderStatus("Confirmed");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Order Status Updated");
              }, 1000);
            }}
          />
        </View>
      ) : orderStatus === "Confirmed" ? (
        <View style={styles.updateButton}>
          <Button
            title="To Ship"
            onPress={() => {
              updateOrderStatus("To Ship");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Order Shipped");
              }, 1000);
            }}
          />
        </View>
      ) : orderStatus === "To Ship" ? (
        <View style={styles.updateButton}>
          <Button
            title="Out for Delivery"
            onPress={() => {
              updateOrderStatus("Out for Delivery");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Order Status Updated");
              }, 1000);
            }}
          />
        </View>
      ) : orderStatus === "Out for Delivery" ? (
        <View style={styles.updateButton}>
          <Button
            title="Order Delivered"
            onPress={() => {
              updateOrderStatus("Order Delivered");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Order Status Updated");
              }, 1000);
            }}
          />
        </View>
      ) : <></>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
  },
  updateButton: {
    marginTop: 20,
    marginHorizontal: 50,
  },
});

export default AdminSingleOrder;
