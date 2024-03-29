import { View, image, Dimensions, Alert } from "react-native";
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
    <View>
      <Box
        style={{ with: width / 2.5, marginTop: 40 }}
      >
        <Button
          variant={"outline"}
          size={"xs"}
          borderColor={"#67729D"}
          onPress={() => navigation.navigate("BrandCreate")}
        >
          <AddIcon />
          <Text color={"gray.500"}>Add New</Text>
        </Button>
      </Box>
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
    </View>
  );
};

export default BrandScreen;
