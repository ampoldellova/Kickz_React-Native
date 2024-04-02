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
  Pressable,
  ImageBackground,
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
      source={require("../assets/homeBackground.png")}
      style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Order Details</Text>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>List of items</Text>
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
                <View style={{ textAlignVertical: "center" }}>
                  <Text style={{ marginTop: 20, fontWeight: "bold" }}>{product.name}</Text>
                  <Text style={{ fontStyle: "italic" }}>Price: ${product.price}</Text>
                  <Text style={{ fontStyle: "italic" }}>Quantity: {product.quantity}</Text>
                </View>
              </View>
            </TouchableHighlight>
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
            {/* <View style={{ marginBottom: 8 }}> */}
            <Rating
              ratingCount={5}
              imageSize={30}
              startingValue={rating}
              minValue={1}
              showRating
              onFinishRating={(text) => setRating(text)}
            />
            <Text style={{ fontSize: 16, marginTop: 20 }}>
              Product: {selectedProduct && selectedProduct.name}
            </Text>
            <TextInput
              editable
              multiline
              numberOfLines={5}
              maxLength={40}
              onChangeText={(text) => setComment(text)}
              placeholder="Enter your review for this product"
              value={comment}
              style={{ padding: 10, borderWidth: 1, textAlignVertical: "top", marginTop: 10, borderRadius: 10 }}
            />
            <Pressable onPress={addComment} style={{ padding: 10, backgroundColor: "#0F0F0F", marginTop: 10, borderRadius: 10 }}>
              <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Submit</Text>
            </Pressable>
            {/* </View> */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            ></ScrollView>
          </ModalContent>
        </BottomModal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 40,
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
  productContainer: {
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
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

export default SingleOrder;
