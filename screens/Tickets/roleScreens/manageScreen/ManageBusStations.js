import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';


const ManageBusStations = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Manage Bus Stations",
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
                        onPress={() => { navigation.navigate("Author") }}

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Author Pg </Text>
                    </Pressable>
                </View>
            )
        })
    }, [])
    return (

        <View style={{ width: "100%", justifyContent: "center", marginTop: 100 }}>
            <ScrollView >
                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View>
                            <Text style={{ marginTop: 6 }}> Add A New Station </Text>
                        </View>
                        <Pressable
                            onPress={() => { navigation.navigate("AddStation") }}
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Add A New Station</Text>

                        </Pressable>
                    </View>
                </View>

                <View style={{ marginVertical: 100, marginHorizontal: 5 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View>
                            <Text style={{ marginTop: 6 }}> Remove A Station </Text>
                        </View>
                        <Pressable
                            onPress={() => { navigation.navigate("GetStationToUpDel") }}
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Remove or Update Station</Text>

                        </Pressable>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default ManageBusStations

const styles = StyleSheet.create({})