import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import baseurl from "../../assets/common/baseurl";
import axios from "axios";

const Chart3Screen = () => {
  const [income, setIncome] = useState([]);
  const getMonthlyIncome = async () => {
    try {
      const { data } = await axios.get(`${baseurl}monthly/income`);
      setIncome(data.monthlyIncome);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMonthlyIncome();
  }, []);

  return (
    <View style={{ marginTop: 50, width: "100%" }}>
      <Text style={styles.title}>Average Sales Per Product</Text>
      <LineChart
        areaChart
        data={income}
        startFillColor="rgb(46, 217, 255)"
        startOpacity={0.8}
        endFillColor="rgb(203, 241, 250)"
        endOpacity={0.3}
      />
    </View>
  );
};

export default Chart3Screen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 20,
    borderRadius: 10,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});
