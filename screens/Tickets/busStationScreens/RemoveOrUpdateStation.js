import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const RemoveOrUpdateStation = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Remove or Update Station",
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

    // Update Station Functions ------------------
    console.log(route.params)
    const getStation = (type) => {
        if (route.params) {
            switch (type) {
                case "station":
                    return route.params.station
            }

        } else
            return ""
    };

    const [station, setStation] = useState(getStation(("station")));

    const UpdateStation = () => {

        if (route.params) {
            //Update User
            Alert.alert(
                `Confirmation de la modification`,
                `Voulez-vous vraiment modifier cette istation?`,
                [
                    {
                        text: 'Annuler',
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: 'Oui', onPress: () => {
                            setDoc(doc(db, "stations", route.params._id), {
                                station,
                                updatedBy: auth.currentUser.email + " " + "On" + " " + new Date().toLocaleString(),
                            })
                            navigation.navigate("RemoveOrUpdateStation");
                        }
                    }
                ]
            )

        }
    }



    const DeleteStation = () => {

        if (route.params) {
            //Update User
            Alert.alert(
                `Supprimer`,
                `Etes vous sûr de vouloir supprimer cette station?`,
                [
                    {
                        text: 'Annuler',
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: 'Oui', onPress: () => {
                            deleteDoc(doc(db, "stations", route.params._id))
                            navigation.navigate("RemoveOrUpdateStation");
                        }
                    }
                ]
            )

        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
                alignItems: "center",
            }}
        >
            <View style={{ marginTop: 5 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Station
                    </Text>

                    <TextInput
                        value={station}
                        onChangeText={(text) => setStation(text)}
                        placeholder="Station"
                        placeholderTextColor={"orange"}
                        style={{
                            fontSize: station ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: station ? "green" : "orange"

                        }}
                    />
                </View>
            </View>

            <Pressable
                onPress={UpdateStation}
                style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 14,
                    borderRadius: 7,
                    marginTop: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "green",
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    Update Station
                </Text>
            </Pressable>

            <Pressable
                onPress={DeleteStation}
                style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 14,
                    borderRadius: 7,
                    marginTop: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    Delete Station
                </Text>
            </Pressable>

        </SafeAreaView>
    )
}

export default RemoveOrUpdateStation

const styles = StyleSheet.create({})