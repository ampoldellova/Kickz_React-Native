import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ChartScreen from "../ChartScreen";
import { Divider } from "native-base";
import Chart2Screen from "../Chart2Screen";
import Chart3Screen from "../Chart3Screen";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, [])
  );

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ width: Dimensions.get("window").width }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ChartScreen />
            <Divider marginY={5} />
            <Chart2Screen />
            <Divider marginY={5} />
            <Chart3Screen />
          </ScrollView>
        </View>
      )}
    </>
  );
}
