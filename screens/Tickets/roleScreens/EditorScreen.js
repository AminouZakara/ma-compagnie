import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


const EditorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log("User Role...", route.params.userData.role);

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Editor Dashboard",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                backgroundColor: "green",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }} >
                    { }
                    <Pressable
                        onPress={() => { navigation.navigate("Create") }}

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <FontAwesome6 name="add" size={14} color="white" />
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Bus </Text>
                    </Pressable>
                </View>
            )
        })
    }, [])
    return (
        <ScrollView>
            <View style={{ marginTop: 300, marginVertical: 20, marginHorizontal: 5 }} >
                <View style={{ margin: 10 }}>
                    <View style={{ elevation: 0.5, justifyContent: "center", borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View style={{ marginTop: 2 }}>
                            <Text style={{ marginTop: 6 }}> Manage All Tickets </Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("AllTickets", {
                                    userData: route.params.userData
                                })
                            }}
                            style={{
                                marginTop: 20,
                                backgroundColor: "green",
                                marginHorizontal: 18,
                                alignItems: "center",
                                gap: 10,
                                borderColor: "green",
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingVertical: 6,
                                width: '95%',
                                elevation: 5,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Manage All Tickets</Text>

                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default EditorScreen

const styles = StyleSheet.create({})