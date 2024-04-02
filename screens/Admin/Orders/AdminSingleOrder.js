import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <ImageBackground
      source={require("../../../assets/homeBackground.png")}
      style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Order Details</Text>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 10 }}>
          <Text style={styles.subHeader}>List of items</Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={{ textAlignVertical: "center" }}>
                <Text style={{ marginTop: 20, fontWeight: "bold" }}>{product.name}</Text>
                <Text style={{ fontStyle: "italic" }}>Price: ${product.price}</Text>
                <Text style={{ fontStyle: "italic" }}>Quantity: {product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Shipping Address</Text>
          <Text>Name: {shippingAddress.name}</Text>
          <Text>
            House no: {shippingAddress.houseNo}, {shippingAddress.street}
          </Text>
          <Text>Landmark: {shippingAddress.landmark}</Text>
          <Text>Postal Code: {shippingAddress.postalCode}</Text>
          <Text>Mobile: {shippingAddress.mobileNo}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Information</Text>
          <Text>Order ID: {_id}</Text>
          <Text>Date: {formatDate(createdAt)}</Text>
          <Text>Status: {orderStatus}</Text>
          <Text>Payment Method: {paymentMethod}</Text>
          <Text style={{ fontWeight: "bold" }}>Total Price: ₱ {totalPrice}</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 40
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productContainer: {
    flexDirection: "row",
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10
  },
  updateButton: {
    marginTop: 20,
    marginHorizontal: 50,
  },
});

export default AdminSingleOrder;
