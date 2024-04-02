import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseurl from '../assets/common/baseurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            setUser(token)
        }
        fetchUser();
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [user])

    console.log(user)

    const fetchAddresses = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `${user}`,
                },
            };

            const response = await axios.get(`${baseurl}addresses/${user}`, config);
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );


    console.log("addresses", addresses);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

                <Pressable onPress={() => navigation.navigate("Addresses")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 5 }}>
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {/* all the added addresses */}
                    {addresses?.map((address, index) => (
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}
                        >
                            <View
                                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    {address?.name}
                                </Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {address?.houseNo}, {address?.city}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                landmark: {address?.landmark}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                street: {address?.street}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                country: {address?.country}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                phone No : {address?.mobileNo}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                pin code : {address?.postalCode}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 7,
                                }}
                            >
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Edit</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Remove</Text>
                                </Pressable>

                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>

        </ScrollView >
    )
}

export default AddAddress

const styles = StyleSheet.create({})