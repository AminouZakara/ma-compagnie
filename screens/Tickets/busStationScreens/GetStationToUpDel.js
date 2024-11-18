import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const GetStationToUpDel = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Get The Station To Up or Del",
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
                        {/* <Ionicons name="person" size={24} color="white" style={{ marginRight: 12 }} /> */}

                    </Pressable>
                </View>
            )
        })
    }, [])

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [editorInput, setEditorInput] = useState("");



    const getAllUsers = async () => {
        try {
            const colRef = collection(db, "stations");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            })
            setData(data);
            setIsLoading(false);
        }
        catch (error) {
            setError(error);
            console.log(error)
            setIsLoading(false);

        }
    }

    console.log("These are the Station data:", data)

    useEffect(() => {
        setIsLoading(true);
        getAllUsers();
    }, []);

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
                        backgroundColor: "white", elevation: 1
                    }}
                >

                    <View style={{ padding: 8, backgroundColor: "white" }}>
                        <View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Text>Choisir l'istation</Text>
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
                                        if (item.station.toLowerCase().includes(editorInput.toLowerCase())) {
                                            if (editorInput === "") {
                                                return null;
                                            }
                                            return (
                                                <Pressable
                                                    onPress={() => navigation.navigate('RemoveOrUpdateStation', {
                                                        _id: item.id,
                                                        station: item.station,
                                                    })}>
                                                    <View style={{ paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>

                                                        <View style={{ alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 40, borderColor: "orange", borderWidth: 4 }}>
                                                            <Text>Image</Text>
                                                        </View>

                                                        <View style={{ marginLeft: 5 }}>
                                                            <Text style={{ fontSize: 17, fontWeight: "600" }}> {item.station}</Text>
                                                            <Text style={{ color: "grey" }}> Region </Text>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                    }}

                                />



                            </SafeAreaView>



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

export default GetStationToUpDel

const styles = StyleSheet.create({})