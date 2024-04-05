import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import baseurl from "../../assets/common/baseurl";
import { BarChart } from "react-native-gifted-charts";

const colors = [
    "#A34343",
    "#E9C874",
    "#E9C874",
    "#C0D6E8",
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

const ChartScreen = () => {
    const [averageSales, setAverageSales] = useState([]);

    const getAverageSales = async () => {
        try {
            const { data } = await axios.get(`${baseurl}average/sales`);
            if (data.success) {
                const items = [];
                for (const product in data.averageSalesPerProduct) {
                    items.push({
                        value: data.averageSalesPerProduct[product].value,
                        label: data.averageSalesPerProduct[product].label,
                        frontColor: colors[Math.floor(Math.random() * colors.length)],
                    });
                }
                setAverageSales(items);
            }
        } catch (error) {
            console.error("Error fetching average sales:", error);
        }
    };

    console.log(averageSales);

    useEffect(() => {
        getAverageSales();
    }, []);

    return (
        <View style={{ marginTop: 50, width: "100%" }}>
            <Text style={styles.title}>Average Sales Per Product</Text>
            {averageSales ? (
                <BarChart
                    showFractionalValue
                    showYAxisIndices
                    noOfSections={5}
                    maxValue={5}
                    data={averageSales}
                    isAnimated
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
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

export default ChartScreen;
