import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartReducer';
import Toast from 'react-native-toast-message';


const Products = ({ item }) => {
    const navigation = useNavigation();
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
    console.log(cart)

    return (
        <Pressable style={{ marginHorizontal: 5, marginVertical: 5, borderWidth: 1, borderRadius: 10, padding: 10, borderColor: "black", backgroundColor: "white" }}>
            <Image
                style={{ width: 147.5, height: 147.5 }}
                source={{ uri: item?.images[0] }}
            />

            <Text numberOfLines={1} style={{ width: 140 }}>
                {item?.name}
            </Text>

            <View
                style={{
                    marginTop: 5,
                }}
            >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>₱ {item?.price}</Text>
            </View>

            <View style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
            }}>
                <Pressable
                    onPress={() => navigation.navigate("ProductDetail", {
                        _id: item?.id,
                        name: item?.name,
                        price: item?.price,
                        description: item?.description,
                        ratings: item?.ratings,
                        images: item?.images,
                        size: item?.size,
                        colorway: item?.colorway,
                        brand: item?.brand.name,
                        brandImage: item?.brand.images,
                        type: item?.type,
                        stock: item?.stock,
                        item: item
                    })}
                    style={{
                        width: 105,
                        backgroundColor: "#0F0F0F",
                        padding: 9,
                        borderRadius: 20,
                        alignItems: "center",
                        marginHorizontal: 5,
                        marginTop: 10
                    }}
                >
                    <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Details</Text>
                </Pressable>

                <Pressable
                    onPress={() => addItemToCart(item)}
                    style={{
                        borderWidth: 1,
                        padding: 9,
                        borderRadius: 20,
                        alignItems: "center",
                        marginTop: 10
                    }}
                >
                    <FontAwesome6 name="add" size={14} color="black" />
                </Pressable>
            </View >
        </Pressable >
    )
}

export default Products

const styles = StyleSheet.create({})