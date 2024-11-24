import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { firebase } from '@react-native-firebase/auth';

const BookingScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const currentUserID = firebase.auth().currentUser.uid;
    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Mes Réservations",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                alignItems: "center"

            },
            headerStyle: {
                backgroundColor: "green",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",

            },

        })
    }, [])
    //getAllBookings ticket to Firestore Database
    const bookedTicket = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [allBookings, setAllBookings] = useState([]);
    useEffect(() => {
        if (allBookings.length > 0) return;
        setIsLoading(true);
        const colRef = collection(db, "bookings");
        const unsub = onSnapshot(colRef, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            })
            setAllBookings(results);
            setIsLoading(false);
        });
        // Cleanup function for unsubscribe when the component is dismounted
        return () => unsub();
    }, []);
    const [datte, setDatte] = useState([])
    console.log("These are The Bookings Dependencies", allBookings);

    allBookings.filter((Bookings) => Bookings.userID === currentUserID).map((item, indexi) => {
        console.log("These are The Bookings Dependencies", item.travelDate);
        datte.push(item.travelDate)
    })
    console.log("Current Date..", new Date().toLocaleDateString())
    console.log("V Date..", datte)
    // compare firebaseTicket to TodayDate







    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                        <Text style={{ padding: 15, backgroundColor: "orange", fontSize: 20, color: "white" }} >Fetching All Your Bookings</Text>
                        <Text style={{ color: "green", fontSize: 22, marginTop: 50 }} > Please wait </Text>
                    </View>
                ) : (
                    <View>
                        {allBookings.filter((Bookings) => Bookings.userID === currentUserID).map((item, indexi) => (
                            <View key={indexi} style={{ width: "auto", borderRadius: 3, marginBottom: 40 }} >
                                <View style={{ flexDirection: "col", justifyContent: "space-between", }} >
                                    {/* <Text> {item.travelDate} / {new Date().toDateString()} </Text> */}
                                    {item.passengerInfo.map((passenger, index) => {
                                        const inputDate = new Date(item.travelDate)
                                        if (passenger.status === undefined) {
                                            if (inputDate < new Date()) {
                                                return (<View
                                                    style={{ backgroundColor: "white", elevation: 0.5 }}
                                                    key={index}>
                                                    <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'lightgrey', paddingHorizontal: 4, paddingVertical: 6, }}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "700", color: "gray" }}> {item.companyName} </Text>

                                                            <Text style={{ color: "grey", fontSize: 15, fontWeight: "500" }} > {item.price} <Text style={{ fontSize: 14, fontWeight: "500", color: "green" }}> CFA </Text>  </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ backgroundColor: 'lightgrey', paddingVertical: 6, flexDirection: "col", justifyContent: "center", alignItems: "center" }}>
                                                        <View style={{ marginTop: 5, }}>
                                                            <Text style={{ fontSize: 16, fontWeight: "500" }} >  {item.depPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> {'--->'} {item.destPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> </Text>
                                                        </View>

                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelDate}  - </Text>

                                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelHour} : {item.travelMinute} </Text>

                                                        </View>
                                                    </View>
                                                    <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'lightgrey', }}>
                                                        <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 4, paddingRight: 10, justifyContent: "space-between", alignItems: "center" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}> {passenger.name} {passenger.surname} </Text>

                                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                                <Text style={{ fontSize: 16, fontWeight: "700", color: "gray" }}> Chaise No: </Text>

                                                                <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", borderColor: "green", borderWidth: 1, width: 40, height: 40, borderRadius: 20, }}>
                                                                    <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>{passenger.seat} </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                            <Pressable

                                                                onPress={() => {
                                                                    Alert.alert(
                                                                        `Voyage Effectué`,
                                                                        `Désolé un voyage effectué ne peut pas etre partagé! Nous vous remercions d'avoir choisir la compagnie de voyage ${item.companyName} `,
                                                                        [

                                                                            {
                                                                                text: `D'accord`, onPress: () => {
                                                                                    console.log("Voyage Effectué")
                                                                                }
                                                                            }
                                                                        ],
                                                                        { cancelable: false }
                                                                    )
                                                                }}
                                                                style={{ backgroundColor: "white", paddingHorizontal: 10, borderRadius: 4 }}
                                                            >

                                                                <Text style={{ color: "orange", letterSpacing: 0.5 }}>Partager</Text>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() => {
                                                                    Alert.alert(
                                                                        `Voyage Effectué`,
                                                                        `Nous vous remercions d'avoir choisir la compagnie de voyage ${item.companyName} `,
                                                                        [

                                                                            {
                                                                                text: `D'accord`, onPress: () => {
                                                                                    console.log("Voyage Effectué")
                                                                                }
                                                                            }
                                                                        ],
                                                                        { cancelable: false }
                                                                    )
                                                                }}
                                                                style={{ backgroundColor: "white", paddingHorizontal: 10, borderRadius: 4 }}
                                                            >

                                                                <Text style={{ color: "orange", letterSpacing: 0.5 }}>Voyage Effectué</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                    <View style={{ paddingHorizontal: 15 }}>

                                                        <View style={{ borderBottomColor: "orange", borderBottomWidth: 4, borderStyle: "dashed", }}></View>

                                                    </View>


                                                </View>)
                                            } else if (inputDate > new Date()) {
                                                return (<View
                                                    style={{ backgroundColor: "white", elevation: 0.5 }}
                                                    key={index}>
                                                    <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'lightgrey', paddingHorizontal: 4, paddingVertical: 6, }}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "700", color: "gray" }}> {item.companyName} </Text>
                                                            <Text style={{ color: "grey", fontSize: 15, fontWeight: "500" }} > {item.price} <Text style={{ fontSize: 14, fontWeight: "500", color: "green" }}> CFA </Text>  </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ backgroundColor: 'lightgrey', paddingVertical: 6, flexDirection: "col", justifyContent: "center", alignItems: "center" }}>
                                                        <View style={{ marginTop: 5, }}>
                                                            <Text style={{ fontSize: 16, fontWeight: "500" }} >  {item.depPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> {'--->'} {item.destPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> </Text>
                                                        </View>

                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelDate}  - </Text>

                                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelHour} : {item.travelMinute} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'lightgrey', }}>
                                                        <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 4, paddingRight: 10, justifyContent: "space-between", alignItems: "center" }}>
                                                            <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}> {passenger.name} {passenger.surname} </Text>

                                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                                <Text style={{ fontSize: 16, fontWeight: "700", color: "gray" }}> Chaise No: </Text>

                                                                <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", borderColor: "green", borderWidth: 1, width: 40, height: 40, borderRadius: 20, }}>
                                                                    <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>{passenger.seat} </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                            <Pressable
                                                                // onPress={() => navigation.navigate("CancelBilletScreen", {
                                                                //     id: passenger.id,
                                                                //     seat: passenger.seat,
                                                                //     ticket: item,
                                                                // })}
                                                                style={{ backgroundColor: "white", paddingHorizontal: 10, borderRadius: 4 }}
                                                            >
                                                                <Text style={{ color: "green", letterSpacing: 0.5 }}>Partager</Text>
                                                            </Pressable>

                                                            <Pressable
                                                                onPress={() => navigation.navigate("CancelBilletScreen", {
                                                                    id: passenger.id,
                                                                    seat: passenger.seat,
                                                                    ticket: item,
                                                                })}
                                                                style={{ backgroundColor: "white", paddingHorizontal: 10, borderRadius: 4 }}
                                                            >

                                                                <Text style={{ color: "green", letterSpacing: 0.5 }}>Billet</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                    <View style={{ paddingHorizontal: 15 }}>

                                                        <View style={{ borderBottomColor: "green", borderBottomWidth: 4, borderStyle: "dashed", }}></View>
                                                    </View>
                                                </View>)
                                            }
                                        } else {
                                            return (<View
                                                style={{ backgroundColor: "white", elevation: 0.5 }}
                                                key={index}>
                                                <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'lightgrey', paddingHorizontal: 4, paddingVertical: 6, }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={{ fontSize: 18, fontWeight: "700", color: "gray" }}> {item.companyName} </Text>

                                                        <Text style={{ color: "grey", fontSize: 15, fontWeight: "500" }} > {item.price} <Text style={{ fontSize: 14, fontWeight: "500", color: "green" }}> CFA </Text>  </Text>
                                                    </View>
                                                </View>
                                                <View style={{ backgroundColor: 'lightgrey', paddingVertical: 6, flexDirection: "col", justifyContent: "center", alignItems: "center" }}>
                                                    <View style={{ marginTop: 5, }}>
                                                        <Text style={{ fontSize: 16, fontWeight: "500" }} >  {item.depPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> {'--->'} {item.destPlace} <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Otogare </Text> </Text>
                                                    </View>

                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                        <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelDate}  - </Text>

                                                        <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {item.travelHour} : {item.travelMinute} </Text>

                                                    </View>
                                                </View>
                                                <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'lightgrey', }}>
                                                    <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 4, paddingRight: 10, justifyContent: "space-between", alignItems: "center" }}>
                                                        <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}> {passenger.name} {passenger.surname} </Text>

                                                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                            <Text style={{ fontSize: 16, fontWeight: "700", color: "gray" }}> Chaise No: </Text>

                                                            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", borderColor: "green", borderWidth: 1, width: 40, height: 40, borderRadius: 20, }}>
                                                                <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>{passenger.seat} </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                                        <Pressable
                                                            onPress={() => {
                                                                Alert.alert(
                                                                    `Billet Annulé!!!`,
                                                                    `Vous avez deja annulé votre billet! `,
                                                                    [

                                                                        {
                                                                            text: `D'accord`, onPress: () => {
                                                                                console.log("Deja Annuler")
                                                                            }
                                                                        }
                                                                    ],
                                                                    { cancelable: false }
                                                                )
                                                            }}
                                                            style={{ backgroundColor: "white", paddingHorizontal: 10, borderRadius: 4 }}
                                                        >

                                                            <Text style={{ color: "red", letterSpacing: 0.5 }}> Billet {passenger.status} </Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                                <View style={{ paddingHorizontal: 15 }}>

                                                    <View style={{ borderBottomColor: "green", borderBottomWidth: 4, borderStyle: "dashed", }}></View>

                                                </View>


                                            </View>)
                                        }
                                    })}
                                    <View style={{ backgroundColor: 'lightgrey', paddingVertical: 6, paddingHorizontal: 4, flexDirection: "row", justifyContent: "space-between", }}>
                                        <Text style={{ fontSize: 18, fontWeight: "600", color: "black" }}> Montant Total:</Text>
                                        <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }} > {item.price * item.selectedSeats.length} <Text style={{ fontSize: 18, fontWeight: "500", color: "green" }}> CFA </Text>  </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )
                }
            </View>
        </ScrollView>
    )
}

export default BookingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f8fafc',
    }
})