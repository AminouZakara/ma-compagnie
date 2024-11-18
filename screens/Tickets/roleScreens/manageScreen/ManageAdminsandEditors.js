import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import filter from 'lodash.filter';
import { contains } from '@firebase/util';
import { Ionicons } from '@expo/vector-icons';


const ManageAdminsandEditors = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Manage Employees",
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
                    <Pressable

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <Ionicons name="person" size={24} color="white" style={{ marginRight: 12 }} />

                    </Pressable>
                </View>
            )
        })
    }, [])

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [editorInput, setEditorInput] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const colRef = collection(db, "users");

        const unsub = onSnapshot(colRef, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            })
            setData(results);
            setIsLoading(false);
        })

        return () => unsub();
    }, [])

    console.log("These are the users data:", data)




    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size='large' animating={isLoading} color="#ffffff" />

        </View>
        )
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', paddingHorizontal: 20 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: "orange" }}> Error in fetching data ...</Text>
                    <Text style={{ fontSize: 14, marginTop: 25 }}> Please check your internet  connection or try again later.</Text>
                </View>

            </View>
        );

    }



    return (
        <View style={{ flex: 1 }}>


            <View style={{ margin: 8, }}>
                <View
                    style={{
                        borderRadius: 8,
                        height: "100%",

                    }}
                >

                    <View style={{ padding: 8, }}>
                        <View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Text>Choisir une Personne Pour Embaucher ou Modifier</Text>
                            </View>
                            <SafeAreaView style={{
                                width: "100%",
                                marginTop: 10
                            }}>
                                <TextInput
                                    placeholder={"Recherche"}
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={editorInput}
                                    onChangeText={(text) => setEditorInput(text)}

                                    style={{
                                        fontSize: 16,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderWidth: 0.5,
                                        borderColor: "green",
                                        borderRadius: 8,
                                        width: "100%",
                                        marginBottom: 10
                                    }}
                                />

                                <FlatList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        if (item.name.toLowerCase().includes(editorInput.toLowerCase())) {
                                            if (editorInput === "") {
                                                return null;
                                            }
                                            if (item.companyName === route.params.userData.companyName || item.companyName === undefined || item.companyName === "") {
                                                return (
                                                    <View>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate('ManageTheRoles', {
                                                                userData: route.params.userData,
                                                                employee: item
                                                            })}
                                                        >
                                                            <View style={{ paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>

                                                                <View style={{ alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 40, borderColor: "orange", borderWidth: 4 }}>
                                                                    <Text>Image</Text>
                                                                </View>

                                                                <View style={{ marginLeft: 5 }}>
                                                                    <Text style={{ color: "green", fontSize: 17, fontWeight: "600" }}> {item.name}  {item.surname}</Text>
                                                                    <Text style={{ color: "grey" }}> {item.email} </Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }

                                        }
                                    }}

                                />
                            </SafeAreaView>
                            {/* --------------- if User role = "Admin" manage Editors -------------------*/}
                            {route.params.userData.role === "Admin" && (<>
                                {/* -------------------  Editorsssssss --------------------------*/}
                                <View style={{ borderBlockColor: "green", borderBottomWidth: 0, borderWidth: 0.5, padding: 5, marginTop: 20, height: 250, borderRadius: 5, }}>
                                    <Text style={{
                                        color: "green", fontSize: 15, fontWeight: "600",
                                    }}>Editeurs</Text>
                                    <View style={{}}>
                                        <FlatList
                                            data={data}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) => {
                                                if (item.companyName === route.params.userData.companyName) {
                                                    if (item.role === "Editor")
                                                        return (
                                                            <View >
                                                                <TouchableOpacity
                                                                    onPress={() => navigation.navigate('ManageTheRoles', {
                                                                        userData: route.params.userData,
                                                                        employee: item
                                                                    })}
                                                                >
                                                                    <View style={{ paddingHorizontal: 1, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>

                                                                        <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 40, borderColor: "orange", borderWidth: 4 }}>
                                                                            <Text>Img</Text>
                                                                        </View>

                                                                        <View style={{ marginLeft: 5 }}>
                                                                            <Text style={{ fontSize: 14, fontWeight: "600" }}> {item.name}  {item.surname}</Text>
                                                                            <Text style={{ color: "grey" }}> {item.email} </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                }


                                            }}
                                        />
                                    </View>
                                </View>
                            </>
                            )}

                            {route.params.userData.role === "Author" && (<>
                                {/* ------------------- Manage Admins --------------------------*/}

                                <View style={{ borderBlockColor: "green", borderBottomWidth: 0, borderWidth: 0.5, padding: 5, marginTop: 60, height: 250 }}>
                                    <Text style={{
                                        color: "green", fontSize: 15, fontWeight: "600",
                                    }}>Admins</Text>
                                    <View>
                                        <FlatList
                                            data={data}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) => {
                                                if (item.companyName === route.params.userData.companyName) {
                                                    if (item.role === "Admin")
                                                        return (
                                                            <View >
                                                                <TouchableOpacity
                                                                    onPress={() => navigation.navigate('ManageTheRoles', {
                                                                        userData: route.params.userData,
                                                                        employee: item
                                                                    })}
                                                                >
                                                                    <View style={{ paddingHorizontal: 1, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>

                                                                        <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 40, borderColor: "orange", borderWidth: 4 }}>
                                                                            <Text>Img</Text>
                                                                        </View>

                                                                        <View style={{ marginLeft: 5 }}>
                                                                            <Text style={{ fontSize: 14, fontWeight: "600" }}> {item.name}  {item.surname}</Text>
                                                                            <Text style={{ color: "grey" }}> {item.email} </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                }


                                            }}

                                        />
                                    </View>
                                </View>
                                {/* ------------------- Manage Editorsssssss --------------------------*/}
                                <View style={{ borderBlockColor: "green", borderBottomWidth: 0, borderWidth: 0.5, padding: 5, marginTop: 20, height: 250, borderRadius: 5, }}>
                                    <Text style={{
                                        color: "green", fontSize: 15, fontWeight: "600",
                                    }}>Editeurs</Text>
                                    <View style={{}}>
                                        <FlatList
                                            data={data}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) => {
                                                if (item.companyName === route.params.userData.companyName) {
                                                    if (item.role === "Editor")
                                                        return (
                                                            <View >
                                                                <TouchableOpacity
                                                                    onPress={() => navigation.navigate('ManageTheRoles', {
                                                                        userData: route.params.userData,
                                                                        employee: item
                                                                    })}
                                                                >
                                                                    <View style={{ paddingHorizontal: 1, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>

                                                                        <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 40, borderColor: "orange", borderWidth: 4 }}>
                                                                            <Text>Img</Text>
                                                                        </View>

                                                                        <View style={{ marginLeft: 5 }}>
                                                                            <Text style={{ fontSize: 14, fontWeight: "600" }}> {item.name}  {item.surname}</Text>
                                                                            <Text style={{ color: "grey" }}> {item.email} </Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                }


                                            }}
                                        />
                                    </View>
                                </View>
                            </>

                            )}

                            {/* Add Editor of Remove Editor */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            </View>
                        </View>
                    </View>
                </View>



            </View>



        </View>
    )
}

export default ManageAdminsandEditors

const styles = StyleSheet.create({})