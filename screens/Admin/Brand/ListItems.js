import { View, Text, Alert } from "react-native";
import React, { Fragment, useCallback, useState } from "react";
import { DataTable } from "react-native-paper";
import { Box, Button, CloseIcon, Image } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseurl from "../../../assets/common/baseurl";

export default function ListItems({ item, deleteBrand }) {
  const navigation = useNavigation();

  const [showAction, setShowAction] = useState(false);

  const toggleAction = () => {
    setShowAction(!showAction);
  };

  useFocusEffect(
    useCallback(() => {
      setShowAction(false);
    }, [])
  );

  const handleEdit = (id) => {
    navigation.navigate("BrandUpdate", id);
  };

  return (
    <>
      <DataTable.Row
        style={{ paddingVertical: 5 }}
        onLongPress={!showAction ? toggleAction : undefined}
        onPress={!showAction ? () => console.log("View") : undefined}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            opacity: showAction ? 0.3 : 1,
          }}
        >
          <DataTable.Cell>
            <Box>
              <Image
                alt={item?.images[0]?.name || "image"}
                source={{
                  uri: item?.images[0] || "https://via.placeholder.com/300",
                }}
                width={50}
                height={50}
              />
            </Box>
          </DataTable.Cell>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.description}</DataTable.Cell>
        </View>
        {showAction && (
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              position: "absolute",
              zIndex: 2,
              width: "100%",
              height: "100%",
              alignItems: "center",
              opacity: 1,
            }}
          >
            <Button size={"xs"} p={2} onPress={() => handleEdit(item._id)}>
              <MaterialCommunityIcons name={"file-edit"} size={18} />
            </Button>
            <Button
              onPress={() => deleteBrand(item._id)}
              colorScheme={"danger"}
              size={"xs"}
              p={2}
            >
              <MaterialCommunityIcons name={"delete"} size={18} />
            </Button>
            <Button
              ml={"auto"}
              size={"xs"}
              p={2}
              colorScheme={"danger"}
              onPress={toggleAction}
            >
              <MaterialCommunityIcons name={"close-circle"} size={18} />
            </Button>
          </Box>
        )}
      </DataTable.Row>
    </>
  );
}
