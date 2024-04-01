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
import { useNavigation } from "@react-navigation/native";
import ListItems from "./ListItems";
import baseurl from "../../../assets/common/baseurl";
var { width } = Dimensions.get("window");

export default function OrderScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getAllOrder = async () => {
    const { data } = await axios.get(`${baseurl}all/orders`);
    console.log(data.order);
    setItems(data.order);
  };

  useFocusEffect(
    useCallback(() => {
      getAllOrder();
      handleSearch("");
    }, [])
  );

  const handleSearch = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const filteredItems = items.filter((item) => regex.test(item.name));
    setFilteredItems(filteredItems);
  };

  const reload = async () => {
    getAllOrder();
    console.log("1")
  };

  return (
    <View>
      <Text>All Orders</Text>
      <Box style={{ with: width / 2.5 }}></Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable style={{}}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 100 }}>Order ID</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>User Name</DataTable.Title>
            <DataTable.Title style={{ width: 80 }}>Total Price</DataTable.Title>
            <DataTable.Title style={{ width: 50 }}>
              Payment Method
            </DataTable.Title>
            <DataTable.Title style={{ width: 50 }}>Status</DataTable.Title>
            <DataTable.Title style={{ width: 50 }}>
              Update Status
            </DataTable.Title>
          </DataTable.Header>

          <View style={{ maxHeight: "100%" }}>
            <ScrollView>
              {items.map((item, i) => (
                <ListItems item={item} key={i} reload={reload} />
              ))}
            </ScrollView>
          </View>
        </DataTable>
      </ScrollView>
    </View>
  );
}
