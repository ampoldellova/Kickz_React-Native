import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = () => {
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
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ backgroundColor: "#0F0F0F", padding: 10, flexDirection: "row", alignItems: "center" }}>
          <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
            <TextInput placeholder="Search..." />
          </Pressable>

          <Entypo name="mic" size={24} color="white" />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, padding: 10, backgroundColor: "#61677A" }}>
          <Entypo name="location-pin" size={24} color="#FFF6E0" />
          <Pressable>
            <Text style={{ fontSizel: 13, fontWeight: "500", color: "#FFF6E0" }}>Deliver to Ampol - East Rembo 1224</Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#FFF6E0" />
        </View>

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
  )
}

export default HomeScreen

const styles = StyleSheet.create({})