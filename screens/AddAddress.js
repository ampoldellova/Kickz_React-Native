import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import { TextInput } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddAddress = () => {
    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

                <Pressable onPress={() => navigation.navigate("Addresses")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 5 }}>
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {/* all the added addresses */}
                </Pressable>
            </View>

        </ScrollView >
    )
}

export default AddAddress

const styles = StyleSheet.create({})