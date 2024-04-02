import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import baseurl from '../../assets/common/baseurl';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';

const colors = [
    '#1F1F1F', '#2C2C2C', '#333333', '#3A3A3A', '#444444', '#4D4D4D', '#555555', '#5C5C5C', '#666666',
    '#707070', '#777777', '#808080', '#8C8C8C', '#999999', '#A6A6A6', '#B3B3B3', '#B9B9B9', '#C0C0C0',
    '#CCCCCC', '#D9D9D9'
];

const ChartScreen = () => {
    const [averageSales, setAverageSales] = useState([]);
    const [totalSales, setTotalSales] = useState([])

    const getAverageSales = async () => {
        try {
            const { data } = await axios.get(`${baseurl}average/sales`);
            const averageSalesWithColor = data.averageSalesPerProduct.map(product => ({
                ...product,
                frontColor: colors[Math.floor(Math.random() * colors.length)]
            }));
            setAverageSales(averageSalesWithColor);
        } catch (error) {
            console.error('Error fetching average sales:', error);
        }
    };

    const getTotalSales = async () => {
        try {
            const { data } = await axios.get(`${baseurl}total/sales`)
            const totalSalesWithColor = data.totalSalesPerProduct.map(product => ({
                ...product,
                frontColor: colors[Math.floor(Math.random() * colors.length)]
            }));
            console.log(totalSalesWithColor)
            setTotalSales(totalSalesWithColor);
        } catch (err) { console.log(err) }
    }

    useFocusEffect(
        useCallback(() => {
            getAverageSales();
            getTotalSales()
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Average Sales Per Product</Text>
            <BarChart
                showFractionalValue
                showYAxisIndices
                noOfSections={4}
                maxValue={5}
                data={averageSales}
                isAnimated
            />
            <Text style={styles.title}>Total Sales Per Product</Text>
            <BarChart
                horizontal
                barWidth={22}
                barBorderRadius={4}
                yAxisThickness={0}
                xAxisThickness={0}
                data={totalSales}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 20,
    },
    title: {
        color: '#332941',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default ChartScreen;
