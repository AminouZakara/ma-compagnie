import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { async } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';

const AddStation = () => {
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

    const [busStation, setBusStation] = useState('')

    const addStation = async () => {
        try {
            // Add a new station with a generated id.
            const docRef = await addDoc(collection(db, "stations"), {
                station: busStation
            });
            console.log("Station written with ID: ", docRef.id);
            Alert.alert(
                `Confirmation`,
                ` Une Nouvelle station a été ajoutée avec succès!`,
                [

                    {
                        text: 'OK', onPress: () => {
                            setBusStation('');
                            console.log(" station reseted");
                        }
                    }
                ]
            )

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <View style={{ width: "100%", justifyContent: "center", }}>
            <View style={{ marginHorizontal: 5, marginVertical: 10, }}>
                {/* Departure */}
                <View style={{ marginTop: 210, width: "100%", elevation: 0.5, borderRadius: 5, backgroundColor: "white", height: 200, alignItems: "center" }}>
                    <Pressable
                        style={{
                            paddingHorizontal: 35,
                            borderColor: "orange",
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                            width: "90%",
                            marginTop: 20
                        }}
                    >
                        <TextInput
                            style={{ marginLeft: 5, fontSize: 16 }}
                            onChangeText={(text) => setBusStation(text)}
                            placeholder={"Ajouter un nouveau station"}
                            placeholderTextColor={busStation ? "black" : "grey"}
                        />


                    </Pressable>

                    <Pressable
                        onPress={addStation}
                        style={{
                            marginTop: 100,
                            backgroundColor: "green",
                            marginHorizontal: 18,
                            alignItems: "center",
                            gap: 10,
                            borderColor: "green",
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingVertical: 6,
                            width: '90%',
                            elevation: 5,
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Ajouter</Text>

                    </Pressable>
                </View>

            </View>
        </View>
    )
}

export default AddStation

const styles = StyleSheet.create({})