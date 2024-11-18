import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';


const AuthorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log("User Role:", route.params.userData?.role);
    console.log("User companyName:", route.params.userData?.companyName);

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Autheur",
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
            <View style={{ marginVertical: 20, marginHorizontal: 5 }} >
                <View style={{ margin: 10 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View style={{ marginTop: 2 }}>
                            <Text style={{ marginTop: 6 }}>Gérer tous les Autobus </Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("AllTickets")
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} >Gestion des Autobus</Text>

                        </Pressable>
                    </View>
                </View>

                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View>
                            <Text style={{ marginTop: 6 }}> Gérer tous les employés</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("ManageAdminsandEditors", {
                                    userData: route.params?.userData
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Gestion des employés</Text>

                        </Pressable>
                    </View>
                </View>

                <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View>
                            <Text style={{ marginTop: 6 }}>Gérer tous les départs et les destinations</Text>
                        </View>
                        <Pressable
                            onPress={() => { navigation.navigate("ManageBusStations") }}
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} >Gestion des Gares routières</Text>

                        </Pressable>
                    </View>
                </View>

                {/* <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                    <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                        <View>
                            <Text style={{ marginTop: 6 }}> Manage Users of This App </Text>
                        </View>
                        <Pressable
                            onPress={() => { navigation.navigate("ManageUsers") }}
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
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Manage Users of This App</Text>

                        </Pressable>
                    </View>
                </View> */}

            </View>
        </ScrollView>

    )
}

export default AuthorScreen

const styles = StyleSheet.create({})