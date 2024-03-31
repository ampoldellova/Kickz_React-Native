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
import { setFormData } from "../../../utils/formData";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, ScrollView, Select } from "native-base";
import { getToken } from "../../../utils/helpers";
import mime from "mime";
import baseurl from "../../../assets/common/baseurl";

const UserUpdate = ({ route }) => {
  const id = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //   const [bio, setBio] = useState(profile.bio);
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

  const getUserInfo = async () => {
    try {
      const tok = await getToken();
      setToken(tok);

      const config = {
        headers: {
          Authorization: `${tok}`,
        },
      };

      const response = await axios.get(`${baseurl}userInfo/${id}`, config);
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
      .put(`${baseurl}update/user/info/${id}`, formData, config)
      .then((res) => {
        navigation.goBack();
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
              : require("../../../assets/user.png")
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

export default UserUpdate;
