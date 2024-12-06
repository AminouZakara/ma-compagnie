import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { firebase } from '@react-native-firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';


const ManageBusStations = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Gestion des Gares Routiéres",
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
                <View style={{ flexDirection: "row",  }} >
                    <Pressable>
                            <FontAwesome6 name="user" size={20} color="white" />
                    </Pressable>
                </View>
            )
        })
    }, [])


    
     //get User
     const [userData, setUserData] = useState('');
     const userId = firebase.auth().currentUser.uid;
     const [isLoading, setIsLoading] = useState(false);
 
     // Fetch UserData ----------------
     useEffect(() => {
         if (userData.length > 0) return;
 
         setIsLoading(true);
 
         const colRef = doc(db, "users", userId);
         const unsub = onSnapshot(colRef, (snapshot) => {
             setUserData(snapshot.data());
             setIsLoading(false);
         });
         return unsub;
     }, []);

    console.log("user data : ", userData)
    return (

        <View style={{ width: "100%", justifyContent: "center", marginTop: 100 }}>
            {
                isLoading ? (
<View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                        <Text style={{ color: "black", fontSize: 22, marginTop: 50 }} >Attendez s'il vous plait...</Text>
                    </View>
                ):(
                    <ScrollView >
                    <View style={{ marginVertical: 20, marginHorizontal: 5 }}>
                        <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                            <View>
                                <Text style={{ marginTop: 6 }}> Ajouter une Nouvelle Station </Text>
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
                                <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} >Ajouter</Text>
    
                            </Pressable>
                        </View>
                    </View>
    
                    <View style={{ marginVertical: 100, marginHorizontal: 5 }}>
                        <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", alignItems: "center", width: "100%", height: 100 }}>
                            <View>
                                <Text style={{ marginTop: 6 }}> Enlever ou Modifier une station </Text>
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
                                <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > Enlever ou Modifier</Text>
    
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                )
            }
           

        </View>
    )
}

export default ManageBusStations

const styles = StyleSheet.create({})