import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, Image, Pressable, TextInput } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartReducer';
import Toast from 'react-native-toast-message';
import { Rating } from 'react-native-ratings';

const ProductDetail = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const addItemToCart = (item) => {
        Toast.show({
            type: 'success',
            text1: 'Message',
            text2: 'Item successfully added to your cart 🛒',
        });
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };

    const cart = useSelector((state) => state.cart.cart);
    console.log("CartItems", cart);

    return (
        <>
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

                    <View style={{ padding: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 35, fontWeight: "bold", fontStyle: "italic" }}>
                            {route?.params?.name}
                        </Text>

                        <Text style={{ fontSize: 12, textAlign: "justify", marginTop: 15 }}>
                            {route?.params?.description}
                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Text style={{ fontWeight: "bold", color: "gray", fontStyle: "italic", fontSize: 14, marginRight: 2 }}>Product Ratings: </Text>
                            <Rating style={{ marginTop: 2.5 }} readonly startingValue={3} ratingCount={5} imageSize={14} />
                        </View>

                        <Text style={{ fontSize: 14, fontStyle: "italic", color: "gray", fontWeight: "bold" }}>
                            Type: {route?.params?.type}
                        </Text>

                        <Text style={{ fontSize: 14, fontStyle: "italic", color: "gray", fontWeight: "bold" }}>
                            Colorway: {route?.params?.colorway}
                        </Text>

                        <Text style={{ fontSize: 14, fontStyle: "italic", color: "gray", fontWeight: "bold" }}>
                            Size: {route?.params?.size}
                        </Text>

                        <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 15 }}>
                            ₱ {route?.params?.price}
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: "white",
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginBottom: 60,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Product Reviews:</Text>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start", marginTop: 10 }}>
                            <Image source={require("../../assets/user.png")} style={{ width: 30, height: 30, borderRadius: 30 }} />
                            <View>
                                <Text style={{ fontWeight: "bold" }}>Firstname Lastname</Text>
                                <Rating style={{ alignSelf: "flex-start" }} readonly startingValue={3} ratingCount={5} imageSize={14} />
                                <Text style={{ textAlign: "justify", width: 280, fontSize: 12 }}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <Pressable
                    onPress={() => addItemToCart(route?.params?.item)}
                    style={{
                        backgroundColor: "#0F0F0F",
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        height: 50,
                        bottom: 0,
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
            </ImageBackground >
        </>
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