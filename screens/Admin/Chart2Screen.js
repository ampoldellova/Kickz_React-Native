import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import baseurl from "../../assets/common/baseurl";
import axios from "axios";

const colors = [
  "#1F1F1F",
  "#2C2C2C",
  "#333333",
  "#3A3A3A",
  "#444444",
  "#4D4D4D",
  "#555555",
  "#5C5C5C",
  "#666666",
  "#707070",
  "#777777",
  "#808080",
  "#8C8C8C",
  "#999999",
  "#A6A6A6",
  "#B3B3B3",
  "#B9B9B9",
  "#C0C0C0",
  "#CCCCCC",
  "#D9D9D9",
];

const Chart2Screen = () => {
  const [sales, setSales] = useState([]);

  const getTotalSales = async () => {
    try {
      const { data } = await axios.get(`${baseurl}total/sales`);
      const items = data.totalSalesPerProduct.map((sales) => ({
        value: sales.value,
        label: sales.label,
        frontColor: colors[Math.floor(Math.random() * colors.length)],
      }));

      setSales(items);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(sales);

  useEffect(() => {
    getTotalSales();
  }, []);
  return (
    <View style={{ marginTop: 20, width: "100%" }}>
      <Text style={styles.title}>Total Sales Per Product</Text>
      <BarChart
        horizontal
        barWidth={22}
        barBorderRadius={4}
        frontColor="lightgray"
        data={sales}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View >
  );
};

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

export default Chart2Screen;
