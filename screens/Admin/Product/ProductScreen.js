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

const ProductScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getAllproduct = async () => {
    const { data } = await axios.get(`${baseurl}get/products`);
    console.log(data.product.brand)
    setItems(data.product);
  };

  useFocusEffect(
    useCallback(() => {
      getAllproduct();
      handleSearch("");
    }, [])
  );

  const handleSearch = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const filteredItems = items.filter((item) => regex.test(item.name));
    setFilteredItems(filteredItems);
  };

  const deleteBrand = async (id) => {
    await axios.delete(`${baseurl}delete/brand/${id}`);
    Alert.alert("Brand Deleted");
    getAllBrand();
  };

  return (
    <View>
      <Text>BrandScreen</Text>
      <Box style={{ with: width / 2.5 }}>
        <Input
          onChangeText={(value) => handleSearch(value)}
          width={"85%"}
          placeholder="Search"
          leftElement={
            <View style={{ marginHorizontal: 10, marginRight: -5 }}>
              <SearchIcon />
            </View>
          }
        />
        <Button
          variant={"outline"}
          size={"xs"}
          borderColor={"#67729D"}
          onPress={() => navigation.navigate("ProductCreate")}
        >
          <AddIcon />
          <Text color={"gray.500"}>Add New</Text>
        </Button>
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable style={{}}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 100 }}>Image</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Name</DataTable.Title>
            <DataTable.Title style={{ width: 80 }}>Price</DataTable.Title>
            <DataTable.Title style={{ width: 50 }}>Size</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Type</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Color Way</DataTable.Title>
            <DataTable.Title style={{ width: 80 }}>Stock</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Brand</DataTable.Title>
          </DataTable.Header>

          <View style={{ maxHeight: "100%" }}>
            <ScrollView>
              {items.map((item, i) => (
                <ListItems item={item} key={i} deleteBrand={deleteBrand} />
              ))}
            </ScrollView>
          </View>
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
