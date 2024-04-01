import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/core";
import baseurl from "../../assets/common/baseurl";
import { setFormData } from "../../utils/formData";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");

  const setImageUpload = async (image) => {
    const newImageUri = image.startsWith("file://")
      ? image
      : "file:///" + image.split("file:/").join("");
    const formattedImage = {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    };
    console.log(formattedImage);
    return formattedImage;
  };

  const checkLoginStatus = async () => {
    try {
      const toke = await AsyncStorage.getItem("authToken");

      if (!toke) {
        navigation.replace("Login");
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  const getUserInfo = async () => {
    try {
      const tok = await getToken();
      setToken(tok);

      const config = {
        headers: {
          Authorization: `${tok}`,
        },
      };

      const response = await axios.get(`${baseurl}profile`, config);
      console.log(response.data);
      setEmail(response.data.user.email);
      setName(response.data.user.name);
      setImage(response.data.user.image);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus()
      getUserInfo();
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const user = {
      name: name,
      email: email,
      image: image,
    };
    if (image.startsWith("file://")) {
      user.image = await setImageUpload(user.image);
    } else {
      user.image = image;
    }
    console.log(user.image);

    const formData = await setFormData(user);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    axios
      .put(`${baseurl}update/user/profile`, formData, config)
      .then((res) => {
        navigation.replace("Main");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            image && image !== ""
              ? { uri: image }
              : require("../../assets/user.png")
          }
        />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={pickImage}>
          <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        {/* <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Bio"
          value={bio}
          onChangeText={setBio}
        /> */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0F0F0F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
});

export default EditProfile;
