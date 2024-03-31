import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseurl from '../../assets/common/baseurl';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const ConfirmationScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAddress, setSelectedAdress] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [option, setOption] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [shippingFee, setShippingFee] = useState("");
    const [user, setUser] = useState("");
    const cart = useSelector((state) => state.cart.cart);
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const grandTotal = total + Number(shippingFee);
    const navigation = useNavigation();
    const dispatch = useDispatch();

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

    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: user,
                cartItems: cart,
                totalPrice: grandTotal,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption,
            };

            const config = {
                headers: {
                    Authorization: `${user}`,
                },
            };

            const response = await axios.post(`${baseurl}order`, orderData, config);
            if (response.status === 200) {
                // Alert.alert("Order", "Order created successfully")
                navigation.navigate("OrderSuccess");
                dispatch(cleanCart());
                console.log("Order created successfully", response.data);
            } else {
                console.log("error creating order", response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const pay = async () => {
        try {
            const options = {
                description: "Adding To Wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_E3GWYimxN7YMk8",
                amount: total * 100,
                prefill: {
                    email: "void@razorpay.com",
                    contact: "9191919191",
                    name: "RazorPay Software",
                },
                theme: { color: "#F37254" },
            };

            const data = await RazorpayCheckout.open(options);

            console.log(data)

            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: "card",
            };

            const config = {
                headers: {
                    Authorization: `${user}`,
                },
            };

            const response = await axios.post(`${baseurl}order`, orderData, config);
            if (response.status === 200) {
                navigation.navigate("Order");
                dispatch(cleanCart());
                console.log("Order created successfully", response.data);
            } else {
                console.log("error creating order", response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <ScrollView style={{ marginTop: 40 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {steps?.map((step, index) => (
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {index > 0 && (
                                <View
                                    style={[
                                        { flex: 1, height: 2, backgroundColor: "green" },
                                        index <= currentStep && { backgroundColor: "green" },
                                    ]}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: "#ccc",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    index < currentStep && { backgroundColor: "green" },
                                ]}
                            >
                                {index < currentStep ? (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text style={{ textAlign: "center", marginTop: 8 }}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
                        Select Delivery Address
                    </Text>

                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#D0D0D0",
                                    padding: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5,
                                    paddingBottom: 17,
                                    marginVertical: 7,
                                    borderRadius: 6,
                                }}
                            >
                                {selectedAddress && selectedAddress._id === item?._id ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                                ) : (
                                    <Entypo
                                        onPress={() => setSelectedAdress(item)}
                                        name="circle"
                                        size={20}
                                        color="gray"
                                    />
                                )}

                                <View style={{ marginLeft: 6 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 3,
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                            {item?.name}
                                        </Text>
                                        <Entypo name="location-pin" size={24} color="red" />
                                    </View>

                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        Address: {item?.houseNo}, {item?.landmark}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        Street: {item?.street}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        Country: {item?.country}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        Phone No: {item?.mobileNo}
                                    </Text>
                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        Postal Code: {item?.postalCode}
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
                                            <Text>Set as Default</Text>
                                        </Pressable>
                                    </View>

                                    <View>
                                        {selectedAddress && selectedAddress._id === item?._id && (
                                            <Pressable
                                                onPress={() => setCurrentStep(1)}
                                                style={{
                                                    backgroundColor: "#0F0F0F",
                                                    padding: 10,
                                                    borderRadius: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <Text style={{ textAlign: "center", color: "white" }}>
                                                    Deliver to this Address
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            )}

            {currentStep == 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
                        Choose your delivery options
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 8,
                            gap: 7,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        {option === "J&T Delivery" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                        ) : (
                            <Entypo
                                onPress={() => { setOption("J&T Delivery"); setShippingFee("50") }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: "green", fontWeight: "500" }}>
                                4-6 Days Process
                            </Text>{" "}
                            - To be delivered by J&T Delivery Company
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 8,
                            gap: 7,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        {option === "Flash Delivery" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                        ) : (
                            <Entypo
                                onPress={() => { setOption("Flash Delivery"); setShippingFee("80") }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: "green", fontWeight: "500" }}>
                                5 Days Process
                            </Text>{" "}
                            - To be delivered by Flash Delivery Company
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 8,
                            gap: 7,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        {option === "Standard Delivery" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                        ) : (
                            <Entypo
                                onPress={() => { setOption("Standard Delivery"); setShippingFee("0") }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: "green", fontWeight: "500" }}>
                                1 week process
                            </Text>{" "}
                            - FREE delivery from your Kickz membership
                        </Text>
                    </View>

                    {option === "Standard Delivery" || option === "Flash Delivery" || option === "J&T Delivery" ? (
                        <Pressable
                            onPress={() => setCurrentStep(2)}
                            style={{
                                backgroundColor: "#0F0F0F",
                                padding: 10,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <Text style={{ color: "white" }}>Continue</Text>
                        </Pressable>
                    ) : <></>}
                </View>
            )}

            {currentStep == 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
                        Select your payment Method
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedOption === "Cash on Delivery" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                        ) : (
                            <Entypo
                                onPress={() => setSelectedOption("Cash on Delivery")}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>Cash on Delivery</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedOption === "Card" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#0F0F0F" />
                        ) : (
                            <Entypo
                                onPress={() => {
                                    setSelectedOption("Card");
                                    Alert.alert("Credit/Debit card", "Do you want to pay Online?", [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel is pressed"),
                                        },
                                        {
                                            text: "Yes",
                                            onPress: () => pay(),
                                        },
                                    ]);
                                }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>Credit or debit card</Text>
                    </View>

                    {selectedOption === "Cash on Delivery" || selectedOption === "Card" ? (
                        <Pressable
                            onPress={() => setCurrentStep(3)}
                            style={{
                                backgroundColor: "#0F0F0F",
                                padding: 10,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <Text style={{ color: "white" }}>Continue</Text>
                        </Pressable>
                    ) : <></>}
                </View>
            )}

            {currentStep === 3 && selectedOption === "Cash on Delivery" && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Place Order Now</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 5,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>List of items</Text>
                        {cart?.map((item, index) => (
                            <View key={index}>
                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", }}>
                                    <View style={{ marginRight: 10 }}>
                                        <Image
                                            style={{ width: 80, height: 80, resizeMode: "contain" }}
                                            source={{ uri: item?.images[0] }}
                                        />
                                    </View>

                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                                            <Text numberOfLines={3} style={{ width: 180, marginTop: 10 }}>
                                                {item?.name}
                                            </Text>

                                            <Image style={{ width: 30, height: 30, resizeMode: "contain" }}
                                                source={{ uri: item?.brand.images[0] }}
                                            />
                                        </View>

                                        <Text style={{ fontSize: 10, fontStyle: "italic", color: "gray", marginTop: -5 }} >
                                            Quantity: x{item?.quantity}
                                        </Text>

                                        <Text style={{ fontWeight: "bold" }} >
                                            ₱ {item?.price}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <Text>Delivering to: {selectedAddress?.name} </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                Price of items:
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>₱ {total}</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                Shipping Fee:
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>₱ {shippingFee}</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                Order Total:
                            </Text>

                            <Text
                                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                            >
                                ₱ {grandTotal}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderRadius: 6,
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ fontSize: 16, color: "gray" }}>Payment method:</Text>

                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                            {selectedOption}
                        </Text>
                    </View>

                    <Pressable
                        onPress={handlePlaceOrder}
                        style={{
                            backgroundColor: "#0F0F0F",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{ color: "white" }}>Place your order</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})