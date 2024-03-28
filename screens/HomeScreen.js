import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();

  const list = [
    {
      id: "0",
      image: require("../assets/nike.png"),
      name: "Nike",
    },
    {
      id: "1",
      image: require("../assets/adidas.png"),
      name: "Adidas",
    },
    {
      id: "2",
      image: require("../assets/converse.png"),
      name: "Converse",
    },
    {
      id: "3",
      image: require("../assets/newbalance.png"),
      name: "New Balance",
    },
    {
      id: "4",
      image: require("../assets/vans.png"),
      name: "Vans",
    }
  ]

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
            <Pressable onPress={() => setModal(!modal)}>
              <Text style={{ fontSize: 13, fontWeight: "500", color: "#FFF6E0" }}>Deliver to Ampol - East Rembo 1224</Text>
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFF6E0" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable key={index} style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 70, height: 70, resizeMode: "contain" }} source={item.image} />
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
            <Pressable onPress={() => {
              setModal(false);
              navigation.navigate("AddAddress")
            }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
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