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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import baseurl from "../../../assets/common/baseurl";

const ProductUpdate = ({ route }) => {
  const id = route.params;
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
    console.log(images);
    brand.images = await setImageUpload(brand.images);

    const formData = await setFormData(brand);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    axios
      .put(`${baseurl}update/brand/${id}`, formData, config)
      .then((res) => {
        setName("");
        setDescription("");
        setImages([]);
        navigation.navigate("Brands");
      })
      .catch((error) => console.log(error.response));
  };

  useFocusEffect(
    useCallback(() => {
      getBrand();
    }, [])
  );

  const getBrand = async () => {
    try {
      await axios
        .get(`${baseurl}get/single/brand/${id}`)
        .then((response) => {
          setName(response.data.brand.name);
          setDescription(response.data.brand.description);
          setImages(response.data.brand.images);
        })
        .catch((error) => console.log(error.response));
    } catch (err) {
      console.log(err);
    }
  };

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

      <Text style={{ marginLeft: 10 }}>Description</Text>
      <TextInput
        value={description}
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        placeholder="Brand Description"
      />

      <Button
        colorScheme="secondary"
        onPress={pickImage}
        style={{ marginLeft: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Pick Image</Text>
      </Button>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {/* {rerender.length > 0
          ? rerender.map((image, index) => (
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
            )) */}
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
        <Button onPress={addBrand}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default ProductUpdate;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 9,
    padding: 5,
  },
});
