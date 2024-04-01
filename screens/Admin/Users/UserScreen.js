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
import ListItems from "./ListItems";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseurl from "../../../assets/common/baseurl";

var { width } = Dimensions.get("window");

const UserScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [token, setToken] = useState("");

  const getAllUsers = async () => {
    const tok = await AsyncStorage.getItem("authToken");

    const config = {
      headers: {
        Authorization: `${tok}`,
      },
    };

    await axios
      .get(`${baseurl}all/users`, config)
      .then((res) => {
        setItems(res.data.user);
        console.log(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("authToken")
        .then((res) => {
          setToken(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      getAllUsers();
    }, [])
  );

  const handleSearch = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const filteredItems = items.filter((item) => regex.test(item.name));
    setFilteredItems(filteredItems);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${baseurl}delete/user/${id}`);
    Alert.alert("User Deleted");
    getAllUsers();
  };

  return (
    <ScrollView style={{ marginTop: 40 }}>
      <Pressable onPress={() => navigation.navigate("Register")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 10, backgroundColor: "#0F0F0F", borderRadius: 10, marginHorizontal: 10, padding: 10 }}>
        <AddIcon style={{ color: "white" }} />
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Add User</Text>
      </Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DataTable style={{}}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 100 }}>Image</DataTable.Title>
            <DataTable.Title style={{ width: 200 }}>Name</DataTable.Title>
            <DataTable.Title style={{ width: 200 }}>Email</DataTable.Title>
          </DataTable.Header>

          <View style={{ maxHeight: "100%" }}>
            <ScrollView>
              {items.map((item, i) => (
                <ListItems item={item} key={i} deleteUser={deleteUser} />
              ))}
            </ScrollView>
          </View>
        </DataTable>
      </ScrollView>
    </ScrollView>
  );
};

export default UserScreen;
