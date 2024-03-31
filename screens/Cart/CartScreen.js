import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incementQuantity, removeFromCart } from "../../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);

  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    Toast.show({
      type: 'success',
      text1: 'Message',
      text2: 'Item successfully removed from your cart 🛒',
    });
    dispatch(removeFromCart(item));
  };

  return (

    <ScrollView style={{ marginTop: 40, flex: 1, backgroundColor: "white" }}>
      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
          <Image style={{ width: 250, height: 250 }} source={require("../../assets/emptyCart.png")} />
          <Text style={{ fontSize: 28 }}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>₱ {total}</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("ConfirmOrder")}
            style={{
              backgroundColor: "#0F0F0F",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Proceed to Buy ({cart.length}) items</Text>
          </Pressable>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 16,
            }}
          />

          <View style={{ marginHorizontal: 10 }}>
            {cart?.map((item, index) => (
              <View
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderBottomColor: "#F0F0F0",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                }}
                key={index}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      style={{ width: 140, height: 140, resizeMode: "contain" }}
                      source={{ uri: item?.images[0] }}
                    />
                  </View>

                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                      <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                        {item?.name}
                      </Text>

                      <Image style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={{ uri: item?.brand.images[0] }}
                      />
                    </View>

                    <Text style={{ fontSize: 12, marginTop: 5, fontStyle: "italic", color: "gray" }}>
                      Type: {item?.type}
                    </Text>

                    <Text style={{ fontSize: 12, fontStyle: "italic", color: "gray" }}>
                      Colorway: {item?.colorway}
                    </Text>

                    <Text style={{ fontSize: 12, fontStyle: "italic", color: "gray" }}>
                      Size: {item?.size}
                    </Text>

                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }} >
                      ₱ {item?.price}
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => decreaseQuantity(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => deleteItem(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}

                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => increaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </Pressable>
              </View>
            ))}
          </View>
        </>
      )}


    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});