import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <View>
            <Text>ProfileScreen</Text>
            <Pressable
                onPress={handleLogout}
                style={{
                    width: 200,
                    backgroundColor: "#0F0F0F",
                    borderRadius: 6,
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: 15
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold"
                }}>
                    Logout
                </Text>
            </Pressable>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})