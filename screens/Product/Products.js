import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

const Products = ({ item }) => {
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
            </View>
        </Pressable>
    )
}

export default Products

const styles = StyleSheet.create({})