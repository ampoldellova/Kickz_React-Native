import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFormData, setImageUpload } from "../../../utils/formData";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ScrollView, Select } from "native-base";
import { Button } from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import baseurl from "../../../assets/common/baseurl";

const ProductCreate = () => {
  const navigation = useNavigation();
  const [brandName, setBrandName] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [colorway, setColorway] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addProduct = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const product = {
      name: name,
      description: description,
      images: images,
      price: price,
      size: size,
      colorway: colorway,
      brand: brand,
      type: type,
      stock: stock,
    };
    product.images = await setImageUpload(product.images);

    const formData = await setFormData(product);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    axios
      .post(`${baseurl}create/products`, formData, config)
      .then((res) => {
        setName("");
        setDescription("");
        setImages([]);
        setPrice(0)
        setSize(0)
        setColorway("")
        setBrand("")
        setType("")
        setStock(0)
        navigation.navigate("Products");
      })
      .catch((error) => console.log(error));
  };

  const getBrand = async () => {
    try {
      await axios.get(`${baseurl}get/brand`).then((res) => {
        setBrandName(res.data.brand);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBrand();
    }, [])
  );

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 10 }}>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Shoe name
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
            placeholder="Enter product name"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
            Shoe brand
          </Text>

          <Select
            width="100%"
            selectedValue={brand}
            placeholder="Select shoe type"
            placeholderTextColor={"gray"}
            style={{ fontSize: 15, borderColor: "#D0D0D0", padding: 10 }}
            onValueChange={(e) => setBrand(e)}
          >
            {brandName.map((c) => {
              return <Select.Item key={c._id} label={c.name} value={c._id} />;
            })}
          </Select>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Shoe Price
          </Text>

          <TextInput
            value={price}
            keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter shoe price"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Shoe Description
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
            placeholder="Enter shoe description"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Shoe size
          </Text>

          <TextInput
            value={size}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={(text) => setSize(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter shoe size"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
            Shoe type
          </Text>

          <Select
            width="100%"
            selectedValue={type}
            placeholder="Select shoe type"
            placeholderTextColor={"gray"}
            style={{ fontSize: 15, borderColor: "#D0D0D0", padding: 10 }}
            onValueChange={(e) => setType(e)}
          >
            <Select.Item
              key={"High-tops"}
              label={"High-tops"}
              value={"High-tops"}
            />
            <Select.Item key={"Mid-cut"} label={"Mid-cut"} value={"Mid-cut"} />;
            <Select.Item key={"Low-tops"} label={"Low-tops"} value={"Low-tops"} />;
            <Select.Item key={"Slip-ons"} label={"Slip-ons"} value={"Slip-ons"} />;
          </Select>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Shoe color
          </Text>

          <TextInput
            value={colorway}
            onChangeText={(text) => setColorway(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter shoe color"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Stock
          </Text>

          <TextInput
            value={stock}
            keyboardType="numeric"
            maxLength={5}
            onChangeText={(text) => setStock(text)}
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter stock of shoe"
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
          {images.map((image, index) => (
            <View key={index} style={{ flexDirection: "row", margin: 7 }}>
              <Image
                source={{ uri: image }}
                style={{ width: 98, height: 98 }}
              />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <FontAwesome
                  name="remove"
                  size={24}
                  color="red"
                  style={{ marginLeft: -30, marginTop: 7 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Button
          colorScheme="secondary"
          onPress={pickImage}
          style={{ width: "100%", marginTop: 10 }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Pick Image</Text>
        </Button>

        {/* Conditionally render the submit button */}
        {images.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <Button onPress={addProduct} style={{ width: "100%", marginTop: 10 }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </Button>
          </View>
        )}

      </View>

    </ScrollView>
  );
};

export default ProductCreate;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 9,
    padding: 5,
  },
});
