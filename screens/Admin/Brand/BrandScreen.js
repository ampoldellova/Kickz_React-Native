import { View, image, Dimensions, Alert, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import {
  AddIcon,
  Box,
  Button,
  Divider,
  Input,
  ScrollView,
  SearchIcon,
  Text,
} from "native-base";
import { DataTable } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import baseurl from "../../../assets/common/baseurl";
import ListItems from "./ListItems";
import { useNavigation } from "@react-navigation/native";

var { width } = Dimensions.get("window");

const BrandScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const getAllBrand = async () => {
    const { data } = await axios.get(`${baseurl}get/brand`);

    setItems(data.brand);
  };

  useFocusEffect(
    useCallback(() => {
      getAllBrand();
      handleSearch("");
    }, [])
  );

  const handleSearch = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const filteredItems = items.filter((item) => regex.test(item.name));
    setFilteredItems(filteredItems);
  };

  const deleteBrand = async (id) => {
    await axios.delete(`${baseurl}delete/brand/${id}`)
    Alert.alert("Brand Deleted")
    getAllBrand();
  };
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <Pressable onPress={() => navigation.navigate("BrandCreate")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, backgroundColor: "#0F0F0F", borderRadius: 10, marginHorizontal: 10, padding: 10 }}>
        <AddIcon style={{ color: "white" }} />
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Add Brand</Text>
      </Pressable>
      <DataTable style={{}}>
        <DataTable.Header>
          <DataTable.Title style={{ width: 100 }}>Image</DataTable.Title>
          <DataTable.Title style={{ width: 100 }}>Name</DataTable.Title>
          {/* <DataTable.Title >Description</DataTable.Title> */}
        </DataTable.Header>
        <View style={{ maxHeight: "100%" }}>
          <ScrollView>
            {/* {filteredItems.slice(from, to).map((item, i) => ( */}
            {items.map((item, i) => (
              <ListItems item={item} key={i} deleteBrand={deleteBrand} />
            ))}
          </ScrollView>
        </View>
      </DataTable>
    </ScrollView>
  );
};

export default BrandScreen;
