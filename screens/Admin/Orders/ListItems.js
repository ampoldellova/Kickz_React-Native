import { View, Text, Alert } from "react-native";
import React, { Fragment, useCallback, useState } from "react";
import { DataTable } from "react-native-paper";
import { Box, Button, CloseIcon, Image } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseurl from "../../../assets/common/baseurl";

const ListItems = ({ item, reload }) => {
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
    navigation.navigate("ProductUpdate", id);
  };

  const updateStatus = (status) => {
    axios
      .put(`${baseurl}update/status`, {
        item: item._id,
        orderStatus: status,
      })
      .then((res) => {
        Alert.alert("Status Updated");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <DataTable.Cell>{item._id}</DataTable.Cell>
          <DataTable.Cell>{item?.user?.name}</DataTable.Cell>
          <DataTable.Cell>{item.totalPrice}</DataTable.Cell>
          <DataTable.Cell>{item.paymentMethod}</DataTable.Cell>
          <DataTable.Cell>{item.orderStatus}</DataTable.Cell>
          <DataTable.Cell>
            {item.orderStatus === "Processing" ? (
              <Button
                onPress={() => {
                  updateStatus("on delivery");
                  setTimeout(() => {
                    reload();
                  }, 1000);
                }}
              ></Button>
            ) : (
              <></>
            )}
          </DataTable.Cell>
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
};

export default ListItems;
