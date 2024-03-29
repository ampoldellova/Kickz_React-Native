import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseurl from '../assets/common/baseurl';

const HomeScreen = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [brands, setBrands] = useState([]);
  const navigation = useNavigation();

  console.log(selectedAddress)
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setUser(token)
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user, modal])

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

  const getAllBrands = async () => {
    const { data: brands } = await axios.get(`${baseurl}get/brand`);
    setBrands(brands);
  };

  useFocusEffect(
    useCallback(() => {
      getAllBrands();
    }, [])
  );

  const banners = [
    require("../assets/nikebanner.png"),
    require("../assets/adidasbanner.png"),
    require("../assets/conversebanner.png"),
    require("../assets/nbbanner.png"),
    require("../assets/vansbanner.png"),
  ]

  return (
    <>
      <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ backgroundColor: "#0F0F0F", padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Pressable>
              <FontAwesome style={{ marginRight: 10 }} name="bars" size={24} color="white" />
            </Pressable>

            <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
              <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
              <TextInput placeholder="Search..." />
            </Pressable>
          </View>

          <Pressable onPress={() => setModal(!modal)} style={{ flexDirection: "row", alignItems: "center", gap: 5, padding: 10, backgroundColor: "#61677A" }}>
            <Entypo name="location-pin" size={24} color="#FFF6E0" />
            {selectedAddress ? (
              <Text style={{ fontSize: 13, fontWeight: "500", color: "#FFF6E0" }}>
                Deliver to {selectedAddress?.name} - {selectedAddress?.street}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: "500", color: "#FFF6E0" }}>
                Select an address
              </Text>
            )}
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFF6E0" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {brands?.brand?.map((item, index) => (
              <Pressable key={index} style={{ margin: 10, marginTop: -5, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 70, height: 70, resizeMode: "contain" }} source={{ uri: item?.images[0] }} />
                <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500" }}>{item?.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox images={banners} autoPlay circleLoop dotColor={"white"} inactiveDotColor={"#FFF6E0"} ImageComponentStyle={{ width: "100%" }} />
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModal(!modal)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModal(!modal)}
        visible={modal}
        onTouchOutside={() => setModal(!modal)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Choose an address</Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>Select a delivery location to see product availability and delivery options.</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#BFCFE7" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={20} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 10, textAlign: "center" }}
                >
                  {item?.houseNo}, {item?.city}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 10, textAlign: "center" }}
                >
                  {item?.landmark}, {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 10, textAlign: "center" }}
                >
                  {item?.country}
                </Text>
              </Pressable>
            ))}

            <Pressable onPress={() => {
              setModal(false);
              navigation.navigate("AddAddress")
            }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                borderRadius: 10,
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text style={{ textAlign: "center", color: "#0066b2", fontWeight: "500" }}>Add an address or pick-up point</Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Entypo name="location" size={24} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400", marginLeft: 5 }}>Enter a pincode</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Ionicons name="locate" size={24} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400", marginLeft: 5 }}>Use my current location</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})