import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import TicketCard from '../../components/TicketCard';
import { firebase } from '@react-native-firebase/auth';


const TicketsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // console.log("User Role:", route.params.userData.role);

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "All Buses",
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
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Bus</Text>
                    </Pressable>
                </View>
            )
        })
    }, [])

    //  Fetching all the tickets
    const [isLoading, setIsLoading] = useState(false);
    const [buses, setBuses] = useState([])
    const userId = firebase.auth().currentUser.uid;
    const [userData, setUserData] = useState('');

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

    // Fetch Buses -----------------------
    useEffect(() => {
        setIsLoading(true)
        const ref = collection(db, "buses");

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            })
            setBuses(results);
            setIsLoading(false);
        })
        return () => unsub();
    }, [])


    const deleteBus = async (id) => {
        Alert.alert(
            //suprimé le billet
            'Annulation de la réservation',
            `Voulez-vous vraiment supprimer cette réservation?`,
            [
                {
                    text: 'Non', onPress: () => console.log("Cancel Pressed"), style: 'cancel'
                },
                {
                    text: 'Oui', onPress: () => {
                        setIsLoading(false)
                        deleteDoc(doc(db, "buses", id))
                        setBuses(buses.filter((bus) => { return bus.id !== id }))
                    }
                }
            ],
            { cancelable: true }
        );
    };
    console.log("UserData:", userData);
    // {
    //     buses.length > 0 ? (
    //   ) : (
    //     <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
    //         <Text style={{ padding: 15, backgroundColor: "orange", fontSize: 20, color: "white" }} >Pas de Bus  </Text>
    //     </View>
    // )
    //             }

    return (
        <View style={{ flex: 1, marginTop: 5 }}>

            {/* Show loading while data is being fetched */}

            {
                isLoading ? (

                    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                        <Text style={{ padding: 15, backgroundColor: "orange", fontSize: 20, color: "white" }} >Fetching All the Buses</Text>
                        <Text style={{ color: "green", fontSize: 22, marginTop: 50 }} > Please wait...</Text>
                    </View>
                ) : (
                    <ScrollView>
                        <View>
                            {
                                buses.map((bus, index) => (
                                    bus.length = 0 ? (
                                        <View style={{
                                            flex: 1, justifyContent: "center", alignItems: "center"
                                        }}>
                                            <Text style={{
                                                fontSize: 20, fontWeight: "500", color: "orange"
                                            }}>No Bus Found</Text>
                                        </View>
                                    ) : (
                                        <View key={index}>
                                            {
                                                bus.companyName === userData.companyName ? (
                                                    <View key={index} style={{ padding: 10, }} >
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: -6, zIndex: 9999 }}>
                                                            {
                                                                userData.role == "Editor" || "Admin" ? (
                                                                    <Pressable onPress={() => deleteBus(bus.id)}>
                                                                        <AntDesign name="delete" size={20} color="darkred" />
                                                                    </Pressable>
                                                                ) : (null)
                                                            }
                                                            <Pressable onPress={() => navigation.navigate("BookedTickets", {
                                                                userData: route.params?.userData,
                                                                _id: bus?.id,
                                                                depPlace: bus.depPlace,
                                                                destPlace: bus.destPlace,
                                                                travelDate: bus.travelDate,
                                                                companyName: bus.companyName,
                                                                travelHour: bus.travelHour,
                                                                travelMinute: bus.travelMinute,
                                                                price: bus.price,
                                                                seatType: bus.seatType,
                                                                durationHour: bus.durationHour,
                                                                durationMinute: bus.durationMinute,

                                                            })}>
                                                                <MaterialCommunityIcons name="ticket-account" size={24} color="orange" />
                                                            </Pressable>
                                                            <Pressable onPress={() => navigation.navigate("Create", {
                                                                _id: bus.id,
                                                                depPlace: bus.depPlace,
                                                                destPlace: bus.destPlace,
                                                                travelDate: bus.travelDate,
                                                                companyName: bus.companyName,
                                                                travelHour: bus.travelHour,
                                                                travelMinute: bus.travelMinute,
                                                                price: bus.price,
                                                                seatType: bus.seatType,
                                                                durationHour: bus.durationHour,
                                                                durationMinute: bus.durationMinute,
                                                                row1: bus.row1,
                                                                row2: bus.row2,
                                                                row3: bus.row3,

                                                            })}>
                                                                <AntDesign name="edit" size={20} color="green" />

                                                            </Pressable>



                                                        </View>

                                                        <View style={{ backgroundColor: "white", borderTopLeftRadius: 5, marginBottom: 2, borderBottomColor: "orange", borderBottomWidth: 0.5, borderTopRightRadius: 5, width: "100%", height: 112, gap: 5 }} >
                                                            <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }} >
                                                                <View style={{ width: "33%", justifyContent: "flex-start", paddingLeft: 5 }} >
                                                                    <Text style={{ fontSize: 20, fontWeight: "500" }} > {bus.companyName} </Text>
                                                                </View>

                                                                <View style={{ width: "33%", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                                                                    <MaterialIcons name="departure-board" size={24} color="green" />
                                                                    <Text style={{ fontWeight: "500", fontSize: 18 }} > {bus.travelHour} :  {bus.travelMinute}</Text>
                                                                </View>

                                                                <View style={{ width: "33%", height: 35, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", }} >
                                                                    <Text style={{ fontWeight: "500", borderRadius: 5, fontSize: 20, color: "green", backgroundColor: "orange", paddingHorizontal: 2 }} >

                                                                        {bus.price}
                                                                        <Text style={{ color: "white" }} > CFA</Text>

                                                                    </Text>
                                                                </View>


                                                            </View>

                                                            <View style={{ flexDirection: "row", width: "100%" }}>
                                                                <View style={{ width: "38%", flexDirection: "row", paddingLeft: 10, alignItems: "center" }} >
                                                                    <MaterialCommunityIcons name="seat-passenger" size={20} color="orange" />
                                                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "400" }}> {bus.seatType} </Text>
                                                                </View>

                                                                <View style={{ width: "62%", flexDirection: "row", alignItems: "center" }} >
                                                                    <MaterialCommunityIcons name="alarm-check" size={18} color="gray" />
                                                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "400" }}> {bus.durationHour}h {bus.durationMinute}mn </Text>
                                                                </View>

                                                            </View>

                                                            <View style={{ flexDirection: "row", width: "100%" }}>
                                                                <View style={{ flexDirection: "row", paddingLeft: 5, justifyContent: "space-between", marginTop: 8 }}>
                                                                    <Text style={{ fontSize: 12, fontWeight: "500", color: "orange" }} >  {bus.depPlace} <Text style={{ color: "grey" }}>Otogare</Text> {'--->'} {bus.destPlace} <Text style={{ color: "grey" }}>Otogare</Text> </Text>
                                                                </View>
                                                            </View>

                                                        </View>
                                                        <TicketCard
                                                            companyName={bus.companyName}
                                                            seatType={bus.seatType}
                                                            price={bus.price}
                                                            availableSeats={bus.availableSeats}
                                                            travelHour={bus.travelHour}
                                                            travelMinute={bus.travelMinute}
                                                            durationHour={bus.durationHour}
                                                            durationMinute={bus.durationMinute}
                                                            depPlace={bus.depPlace}
                                                            destPlace={bus.destPlace}
                                                            travelDate={bus.travelDate}
                                                            row_1={bus.row1}
                                                            row_2={bus.row2}
                                                            row_3={bus.row3}
                                                            _id={bus.id} />

                                                    </View >
                                                ) : (null)
                                            }
                                        </View>
                                    )
                                ))
                            }
                        </View>
                    </ScrollView>

                )
            }

        </View>

    );
}

export default TicketsScreen

const styles = StyleSheet.create({})   