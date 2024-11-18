import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const CancelBilletScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const reservedBus = route.params.ticket;
    // console.log("reservedBus data...", reservedBus);
    // console.log("bookingId...", reservedBus.id);




    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "A Propos de mon Billet",
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

    // fetch the bus from firebase and then compare the ticket to the ticket to be canceled
    const [isLoading, setIsLoading] = useState(false);
    const [firebaseBuses, setFirebaseBuses] = useState([]);
    const [firebaseBus, setFirebaseBus] = useState([]);
    const [firebaseRow1, setFirebaseRow1] = useState([]);
    const [firebaseRow2, setFirebaseRow2] = useState([]);
    const [firebaseRow3, setFirebaseRow3] = useState([]);


    useEffect(() => {
        setIsLoading(true)
        const ref = collection(db, "buses");

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            })
            setFirebaseBuses(results);
            setIsLoading(false);
        })
        return () => unsub();
    }, [])

    // console.log("firebaseBuses...", firebaseBuses);

    firebaseBuses?.filter((bus) => bus.id === reservedBus.busId).map((ticket, index) => {
        firebaseBus.push({ ...ticket, id: ticket.id })
        firebaseRow1.push({ ...ticket.row1, id: ticket.id, })
        firebaseRow2.push({ ...ticket.row2, id: ticket.id, })
        firebaseRow3.push({ ...ticket.row3, id: ticket.id, })
        // console.log("This is the id", ticket.id);
    })
    // console.log("firebaseBus...", firebaseBus);



    // update the ticket to be available for other client to book

    //   First : Get The Bus
    const [firebaseBusData, setFirebaseBusData] = useState("")

    const getTheBus = async () => {
        const docRef = doc(db, "buses", reservedBus.busId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFirebaseBusData(docSnap.data());
            // console.log("Document data:", docSnap.data());

        } else {
            // doc.data() will be undefined in this case 
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getTheBus()
    }, []);
    // console.log("Firebase Dataaas...", firebaseBusData)

    // update the ticket to be available for other client to book
    const deleteThenUpdateTheTicket = async () => {
        const busItems = {
            ...firebaseBusData,
            row1: firebaseBusData.row1.map((seat) => {
                if (seat.value === chozenSeat) {
                    return {
                        ...seat,
                        empty: seat.empty = "available"
                    }
                } else {
                    return seat
                }
            }),
            row2: firebaseBusData.row2.map((seat) => {
                if (seat.value === chozenSeat) {
                    return {
                        ...seat,
                        empty: seat.empty = "available"
                    }
                } else {
                    return seat
                }
            }),
            row3: firebaseBusData.row3.map((seat) => {
                if (seat.value === chozenSeat) {
                    return {
                        ...seat,
                        empty: seat.empty = "available"
                    }
                } else {
                    return seat
                }
            })
        }

        Alert.alert(
            `Annuler!!!`,
            `Voulez-vous vraiment anuuler votre billet?`,
            [
                {
                    text: 'Annuler',
                    onPress: () => {
                        console.log("Annuler")
                        navigation.goBack()
                    }
                },
                {
                    text: 'Oui', onPress: () => {
                        updateDoc(doc(db, "buses", reservedBus.busId), busItems)
                        updateTicket()
                        console.log("Ticket deleted and the ticket is now available to be booked")
                        navigation.navigate("Bookings")
                        //disable button
                    }
                }
            ],
            { cancelable: false }
        )

        //Update User

    }

    // console.log("firebaseRow2Data....", firebaseBusData.row2);
    // console.log("Bus ID....", reservedBus.busId);

    // get The user Bookings 
    const [userBooking, setUserBooking] = useState("");
    const getTheBooking = async () => {
        const docRef = doc(db, "bookings", reservedBus.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserBooking(docSnap.data());
            // console.log("Document data:", docSnap.data());

        } else {
            // doc.data() will be undefined in this case 
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getTheBooking()
    }, []);
    // console.log("userBooking Dataaas...", userBooking)
    // console.log("userBooking Dataaas...", chozenSeat.id)
    // update the ticket to canceled 
    const chozenSeat = route.params.seat;
    console.log("Les données ...", route.params);
    console.log("chozenSeat ...", chozenSeat);
    console.log("chozenSeat ...", route.params.id);
    const updateTicket = async () => {
        const bookingItems = {
            ...userBooking,
            passengerInfo: userBooking.passengerInfo.map((reservedTicket) => {
                if (reservedTicket.seat == chozenSeat) {
                    return {
                        ...reservedTicket,
                        status: "Annulé",
                    }
                }
                return reservedTicket;
            })
        }
        console.log("bookingItems", bookingItems)
        await updateDoc(doc(db, "bookings", reservedBus.id), bookingItems)
    }



    return (
        <View style={styles.container}>
            <View style={{ width: "95%", borderWidth: 0.5, padding: 5, borderColor: "green", flexDirection: "row", marginHorizontal: 10, marginTop: 40 }}>
                <FontAwesome name="warning" size={40} color="orange" />

                <View style={{ marginLeft: 22, width: "84%" }}>
                    <Text style={{ fontSize: 15 }}>Vous pouvez annuler votre billet
                        <Text style={{ color: "crimson" }}> 24 heures </Text>
                        avant le depart de votre bus</Text>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, width: "95%", borderWidth: 0.5, padding: 5, borderColor: "green", marginHorizontal: 10, marginTop: 80 }}>
                <View style={{ marginTop: 5, }}>
                    <Text style={{ fontSize: 16, fontWeight: "500" }} >Annuler mon voyage de  <Text style={{ fontSize: 16, fontWeight: "500", color: "green" }}>{reservedBus.depPlace} </Text> a <Text style={{ fontSize: 16, fontWeight: "500", color: "green" }}> {reservedBus.destPlace} </Text> </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", }}> Date: <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}>{reservedBus.travelDate}  </Text> </Text>

                    <Text style={{ fontSize: 16, fontWeight: "500", }}> Time: <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}> {reservedBus.travelHour} : {reservedBus.travelMinute} </Text></Text>

                </View>
                <TouchableOpacity onPress={deleteThenUpdateTheTicket}>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Annuler</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default CancelBilletScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    btnContainer: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'green',
        borderRadius: 5,
        height: 30,
        width: 90,
        marginBottom: -20

    },
    btnText: {
        color: "white",
        fontSize: 14,
        fontWeight: 'bold',
    },

})