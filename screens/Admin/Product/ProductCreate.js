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
import { Select } from "native-base";
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
    <View>
      <Text>Brand Create</Text>

      <Text style={{ marginLeft: 10 }}>Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        placeholder="Brand Name"
      />

      <Select
        width="80%"
        style={{ width: undefined }}
        selectedValue={brand}
        placeholder="Select Brand"
        placeholderStyle={{ color: "#007aff" }}
        placeholderIconColor="#007aff"
        onValueChange={(e) => setBrand(e)}
      >
        {brandName.map((c) => {
          return <Select.Item key={c._id} label={c.name} value={c._id} />;
        })}
      </Select>

      <Text style={{ marginLeft: 10 }}>Price</Text>
      <TextInput
        value={price}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(text) => setPrice(text)}
        placeholder="Price"
        maxLength={5}
      />

      <Text style={{ marginLeft: 10 }}>Description</Text>
      <TextInput
        value={description}
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        placeholder="Brand Description"
      />

      <Text style={{ marginLeft: 10 }}>Size</Text>
      <TextInput
        value={size}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(text) => setSize(text)}
        placeholder="Size"
        maxLength={2}
      />

      <Select
        width="80%"
        style={{ width: undefined }}
        selectedValue={type}
        placeholder="Select Type"
        placeholderStyle={{ color: "#007aff" }}
        placeholderIconColor="#007aff"
        onValueChange={(e) => setType(e)}
      >
        <Select.Item
          key={"High-tops"}
          label={"High-tops"}
          value={"High-tops"}
        />
        ;
        <Select.Item key={"Mid-cut"} label={"Mid-cut"} value={"Mid-cut"} />;
        <Select.Item key={"Low-tops"} label={"Low-tops"} value={"Low-tops"} />;
        <Select.Item key={"Slip-ons"} label={"Slip-ons"} value={"Slip-ons"} />;
      </Select>

      <Text style={{ marginLeft: 10 }}>Color Way</Text>
      <TextInput
        value={colorway}
        style={styles.input}
        onChangeText={(text) => setColorway(text)}
        placeholder="Color Way"
      />

      <Text style={{ marginLeft: 10 }}>Stock</Text>
      <TextInput
        value={stock}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(text) => setStock(text)}
        placeholder="Stock"
        maxLength={5}
      />

      <Button
        colorScheme="secondary"
        onPress={pickImage}
        style={{ marginLeft: 10 }}
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
      <View style={{ alignItems: "center" }}>
        <Button onPress={addProduct}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
        </Button>
      </View>
    </View>
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
