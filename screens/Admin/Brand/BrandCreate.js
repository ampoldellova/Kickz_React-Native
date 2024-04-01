import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFormData, setImageUpload } from "../../../utils/formData";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Button } from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import baseurl from "../../../assets/common/baseurl";

const BrandCreate = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addBrand = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const brand = {
      name: name,
      description: description,
      images: images,
    };
    brand.images = await setImageUpload(brand.images);

    const formData = await setFormData(brand);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    axios
      .post(`${baseurl}create/brand`, formData, config)
      .then((res) => {
        setName("");
        setDescription("");
        setImages([]);
        navigation.navigate("Brands");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={{ padding: 10 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Brand Name
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter brand name"
          />
        </View>
        {/* <Text style={{ marginLeft: 10 }}>Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        placeholder="Brand Name"
      /> */}

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Brand Description
          </Text>

          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter brand description"
          />
        </View>

        <Button
          colorScheme="secondary"
          onPress={pickImage}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Pick Image</Text>
        </Button>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {images.map((image, index) => (
            <View key={index} style={{ flexDirection: "row", margin: 7 }}>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, margin: 5 }}
              />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <FontAwesome
                  name="remove"
                  size={24}
                  color="red"
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {images.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <Button onPress={addBrand} style={{ width: "100%" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BrandCreate;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 9,
    padding: 5,
  },
});
