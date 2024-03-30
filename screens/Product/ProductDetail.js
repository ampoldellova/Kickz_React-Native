import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, Image, Pressable } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartReducer';

const ProductDetail = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };

    const cart = useSelector((state) => state.cart.cart);
    console.log("CartItems", cart);

    return (
        <ImageBackground source={require("../../assets/homeBackground.png")} style={styles.background}>
            <ScrollView style={{ marginTop: 40, flex: 1 }} showsVerticalScrollIndicator={false}>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {route.params.images.map((item, index) => (
                        <ImageBackground
                            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
                            source={{ uri: item }}
                            key={index}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Image style={{
                                    width: 70,
                                    height: 70,
                                    resizeMode: "contain",
                                    marginTop: -25,
                                    marginLeft: 10
                                }}
                                    source={{ uri: route?.params?.brandImage[0] }}
                                />
                                <View style={{
                                    borderRadius: 20,
                                    marginTop: -35,
                                    marginRight: 20
                                }}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: route?.params?.stock <= 0 ? "red" : "green" }}>
                                        {route?.params?.stock <= 0 ? "Out of Stock" : "In Stock"}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    ))}
                </ScrollView>

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 35, fontWeight: "bold", fontStyle: "italic" }}>
                        {route?.params?.name}
                    </Text>

                    <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 15 }}>
                        {route?.params?.description}
                    </Text>

                    <Text style={{ fontSize: 12, marginTop: 5, fontStyle: "italic", color: "#02ad98", fontWeight: "bold" }}>
                        Type: {route?.params?.type}
                    </Text>

                    <Text style={{ fontSize: 12, fontStyle: "italic", color: "#02ad98", fontWeight: "bold" }}>
                        Colorway: {route?.params?.colorway}
                    </Text>

                    <Text style={{ fontSize: 12, fontStyle: "italic", color: "#02ad98", fontWeight: "bold" }}>
                        Size: {route?.params?.size}
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 15 }}>
                        ₱ {route?.params?.price}
                    </Text>
                </View>

                <Pressable
                    onPress={() => addItemToCart(route?.params?.item)}
                    style={{
                        backgroundColor: "#0F0F0F",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginTop: 10
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        {addedToCart ? (
                            <Ionicons name="cart-sharp" size={24} color="white" />
                        ) : (
                            <Ionicons name="cart-outline" size={24} color="white" />
                        )}
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
                            {addedToCart ? (
                                <Text>Added to Cart</Text>
                            ) : (
                                <Text>Add to Cart</Text>
                            )}
                        </Text>
                    </View>
                </Pressable>
            </ScrollView>
        </ImageBackground >
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Stretch background image to cover entire screen
        justifyContent: 'center',
        height: "100%"
    }
})