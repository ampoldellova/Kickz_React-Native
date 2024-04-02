import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
  TextInput,
  TouchableHighlight,
} from "react-native";
import baseurl from "../assets/common/baseurl";
import axios from "axios";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";

const SingleOrder = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

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

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const addComment = async () => {
    // console.log(selectedProduct.id?._id)
    const token = await AsyncStorage.getItem("authToken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    axios
      .post(
        `${baseurl}create/review/${selectedProduct.id?._id}`,
        { comment: comment, ratings: rating },
        config
      )
      .then((res) => {
        setComment("");
        setRating(1);
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text style={styles.subHeader}>Products</Text>
      {products.map((product, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => handleProductPress(product)}
          underlayColor="transparent"
        >
          <View style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text>Price: ${product.price}</Text>
              <Text>Quantity: {product.quantity}</Text>
            </View>
          </View>
        </TouchableHighlight>
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
      {orderStatus === "Order Delivered" ? (
        <View style={styles.updateButton}>
          <Button
            title="Update Status to Received"
            onPress={() => {
              updateOrderStatus("Order Received");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Status Updated", "Kindly Check your Order");
              }, 1000);
            }}
          />
        </View>
      ) : orderStatus === "Processing" ? (
        <View style={styles.updateButton}>
          <Button
            title="Cancel Order"
            color="red"
            onPress={() => {
              updateOrderStatus("Cancelled");
              setTimeout(() => {
                navigation.navigate("Order");
                Alert.alert("Order Cancelled", "Kindly Check your Order");
              }, 1000);
            }}
          />
        </View>
      ) : null}

      {/*Modal for Reviews and Rating */}
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {selectedProduct && selectedProduct.name}
            </Text>
            <Rating
              ratingCount={5}
              imageSize={30}
              startingValue={rating}
              minValue={1}
              showRating
              onFinishRating={(text) => setRating(text)}
            />
            <TextInput
              placeholderTextColor={"gray"}
              multiline
              numberOfLines={5}
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder="Reviews"
              style={{
                marginTop: 5,
                fontSize: 16,
                color: "gray",
                borderWidth: 1,
              }}
            ></TextInput>
            <Button title="submit" onPress={addComment}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </Button>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          ></ScrollView>
        </ModalContent>
      </BottomModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 40,
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

export default SingleOrder;
