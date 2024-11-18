import { Alert, Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { savedTicket } from '../SavedReducer';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { async } from '@firebase/util';
import { CardField, StripeProvider, useConfirmPayment, usePaymentSheet } from '@stripe/stripe-react-native';
import StripeApp from '../components/StripeApp';
import StripePayment from '../components/StripePayment';
import { firebase } from '@react-native-firebase/auth';
import CardPayment from '../components/payment methods/CardPayment';
import OrangeMoneyPayment from '../components/payment methods/OrangeMoneyPayment';
import MyNitaPayment from '../components/payment methods/MyNitaPayment';
import MyZamaniPayment from '../components/payment methods/MyZamaniPayment';
import MoovFoozPayment from '../components/payment methods/MoovFoozPayment';
import AmanaTa from '../components/payment methods/AmanaTa';
import Al_izzaPayment from '../components/payment methods/Al_izzaPayment';

const ConfirmationScreen = () => {
    const route = useRoute()
    //// TicketUserID means the person who added the Bus ID

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Confirmation du Billet",

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
            // USER Profile
            // headerRight: () => (
            //     <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 12 }} />
            // )

        })
    }, [])

    const bookedTicket = route.params;
    const userID = firebase.auth().currentUser?.uid;

    // addBooking ticket to Firestore Database
    const addBooking = async () => {
        const confirmedTicket = {
            By,
            TicketUserID,
            userData: userData,
            busId: bookedTicket._id,
            companyName: bookedTicket.companyName,
            depPlace: bookedTicket.depPlace,
            destPlace: bookedTicket.destPlace,
            travelDate: bookedTicket.travelDate,
            seatType: bookedTicket.seatType,
            price: bookedTicket.price,
            travelHour: bookedTicket.travelHour,
            travelMinute: bookedTicket.travelMinute,
            durationMinute: bookedTicket.durationMinute,
            durationHour: bookedTicket.durationHour,
            passengerInfo: bookedTicket.passengerInfo,
            email: userData.email,
            userID: userID,
            selectedSeats: bookedTicket.selectedSeats,
        }
        // console.log(confirmedTicket)
        // Add a New Ticket
        try {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "bookings"), {
                ...confirmedTicket,
            });
            console.log("A new Booking has been conrfirmed successfully! ", docRef.id);

        } catch (e) {
            console.log(e);
        }
    }

    const selectedSeats = route.params.selectedSeats;

    // get The userData and save with the selected seats
    const [userData, setUserData] = useState('');
    const userId = firebase.auth().currentUser?.uid;
    const user = firebase.auth().currentUser;

    const getUser = async () => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    // console.log("user data : ", userData)
    // console.log(" Current User: ----", userData.name)


    // UpdateTickets -------------------
    const getTicketDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "depPlace":
                    return route.params.depPlace
                case "destPlace":
                    return route.params.destPlace
                case "companyName":
                    return route.params.companyName
                case "travelDate":
                    return route.params.travelDate
                case "travelHour":
                    return route.params.travelHour
                case "travelMinute":
                    return route.params.travelMinute
                case "price":
                    return route.params.price
                case "seatType":
                    return route.params.seatType
                case "durationHour":
                    return route.params.durationHour
                case "durationMinute":
                    return route.params.durationMinute
                case "row1":
                    return route.params.row1
                case "row2":
                    return route.params.row2
                case "row3":
                    return route.params.row3
                case "TicketUserID":
                    return route.params.TicketUserID
                case "By":
                    return route.params.By


            }


        } else
            return ""

    };

    const [depPlace, setDepPlace] = useState(getTicketDetails('depPlace'));
    const [destPlace, setDestPlace] = useState(getTicketDetails('destPlace'));
    const [travelDate, setTravelDate] = useState(getTicketDetails('travelDate'));
    //Properties
    const [companyName, setCompanyName] = useState(getTicketDetails('companyName'));
    const [seatType, setSeatType] = useState(getTicketDetails('seatType'));
    const [price, setPrice] = useState(getTicketDetails('price'));
    const [By, setBy] = useState(getTicketDetails('By'));
    const [TicketUserID, setTicketUserID] = useState(getTicketDetails('TicketUserID'));
    const [travelHour, setTravelHour] = useState(getTicketDetails('travelHour'));
    const [travelMinute, setTravelMinute] = useState(getTicketDetails('travelMinute'));
    const [durationHour, setDdurationHour] = useState(getTicketDetails('durationHour'));
    const [durationMinute, setDurationMinute] = useState(getTicketDetails('durationMinute'));
    const [row1, setRow1] = useState(getTicketDetails('row1'));
    const [row2, setRow2] = useState(getTicketDetails('row2'));
    const [row3, setRow3] = useState(getTicketDetails('row3'))
    const [selectedTickets, setSelectedTickets] = useState(route.params.seats)

    // console.log("depPlace", depPlace);
    // console.log("selected Tickets", selectedTickets);

    const [isLoading, setIsLoading] = useState(false);
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
            setFirebaseBus(results);
            setIsLoading(false);
        })
        return () => unsub();
    }, [])

    // console.log("firebaseBus...", firebaseBus);

    firebaseBus?.filter((bus) => bus.id === route.params._id).map((ticket, index) => {
        firebaseRow1.push({ ...ticket.row1, id: ticket.id, })
        firebaseRow2.push({ ...ticket.row2, id: ticket.id, })
        firebaseRow3.push({ ...ticket.row3, id: ticket.id, })
        // console.log("This is the id", ticket.id);
    })
    // console.log("firebaseRow1...", firebaseRow1);
    // console.log("firebaseRow2...", firebaseRow2);
    // console.log("firebaseRow3...", firebaseRow3);


    const UpdateTickets = async () => {
        const busItems = {
            depPlace, destPlace, travelDate, companyName, travelHour, travelMinute, price, seatType, durationHour, durationMinute, By, TicketUserID, userID: route.params.userID,
            row1: route.params.row1.map(seat => {
                if (seat.selected == "true") {
                    return {
                        ...seat,
                        selected: seat.selected = "false"
                    }
                } else {
                    return seat
                }
            }),
            row2: route.params.row2.map(seat => {
                if (seat.selected == "true") {
                    return {
                        ...seat,
                        selected: seat.selected = "false"
                    }
                } else {
                    return seat
                }
            }),
            row3: route.params.row3.map(seat => {
                if (seat.selected == "true") {
                    return {
                        ...seat,
                        selected: seat.selected = "false"
                    }
                } else {
                    return seat
                }
            }),
        }
        // try {
        //     addBooking(dispatch, bookedTicket);
        //     navigation.navigate('Main');
        //     console.log('Success!', 'The first row of the ticket has been updated');
        // } catch (err) {
        //     console.log("Failed to update the Ticket", err);
        // }
        await selectedSeats.map((selectSeat) => {
            firebaseBus?.filter((bus) => bus.id === route.params._id).map((ticket, index) => {
                ticket.row1.map((st) => {
                    if (selectSeat == st.value && st.empty === "available") {
                        updateDoc(doc(db, "buses", route.params._id), busItems)
                        navigation.navigate('Main')
                    }
                })
                ticket.row2.map((st) => {
                    if (selectSeat == st.value && st.empty === "available") {
                        updateDoc(doc(db, "buses", route.params._id), busItems)
                        navigation.navigate('Main')
                    }

                })
                ticket.row3.map((st) => {
                    if (selectSeat == st.value && st.empty === "available") {
                        updateDoc(doc(db, "buses", route.params._id), busItems)
                        navigation.navigate('Main')
                    }

                })
            })
        })


    }

    // console.log("Chosen Ones...", selectedSeats)

    // about Payments
    const [selectedPayment, setSelectedPayment] = useState('card');

    const dispatch = useDispatch();
    const confirmBooking = () => {
        UpdateTickets();
        addBooking();
        // dispatch(savedTicket(route.params));
    }

    // console.log("PassengerInfo bookedTicket...", bookedTicket.passengerInfo);

    return (
        <>
            <ScrollView>
                <View>
                    {
                        selectedSeats.map((selectSeat) => {
                            return (
                                firebaseBus?.filter((bus) => bus.id === route.params._id).map((ticket, index) => {
                                    return (
                                        <View key={index}>
                                            {ticket.row1.map((st, ind) => {
                                                if (selectSeat == st.value && st.empty === "booked") {
                                                    return (
                                                        <View key={ind}>
                                                            {
                                                                Alert.alert(

                                                                    'SVP Choisir une autre chaise',
                                                                    ` Quelqu'un vient juste de reserver la chaise No: ${st.value} `,
                                                                    [
                                                                        {
                                                                            text: 'OK', onPress: () => {
                                                                                navigation.navigate('Main')
                                                                            }
                                                                        }
                                                                    ],
                                                                )

                                                            }

                                                        </View>
                                                    )
                                                }
                                                // else if (selectSeat == st.value && st.empty === "available") {
                                                //     return (
                                                //         <View>
                                                //             <Text>You have chosen - {st.value} </Text>
                                                //         </View>
                                                //     )
                                                // }

                                            })}
                                        </View>
                                    )
                                })
                            )

                        })
                    }
                </View>
                <View key={route.params.id} style={styles.container}>
                    <View style={{ width: "auto", borderRadius: 3, padding: 5 }} >
                        <View style={{ backgroundColor: "white", gap: 15, borderRadius: 5, elevation: 10, padding: 8 }} >


                            <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "gray" }}> {route.params.companyName} </Text>
                                <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }} > {route.params.travelDate} </Text>
                                <Text style={{ fontSize: 16, color: "gray", fontWeight: "500" }}> {route.params.travelHour} : {route.params.travelMinute} </Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "500" }} >  {route.params.depPlace} <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>Otogare </Text> {'--->'} {route.params.destPlace} <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>Otogare </Text> </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                <View style={{ flexDirection: "row" }} >
                                    <FontAwesome5 name="user-alt" size={20} color="gray" />
                                    <Text style={{ paddingLeft: 3, fontWeight: "500", fontSize: 16 }} > {route.params.seats.length}  <Text style={{ fontSize: 13, fontWeight: "500", color: "gray" }}>
                                        {route.params.seats.length > 1 ? "Passagers " : "Passager "}
                                    </Text> {route.params.fullName} </Text>
                                </View>
                                <View style={{ flexDirection: "row", fontWeight: "500", fontSize: 14, }} >
                                    <Text style={{ alignItems: "center", fontSize: 14, fontWeight: "500", color: "gray" }}> Chaise No:
                                    </Text>
                                    <Text> {route.params.selectedSeats.join(', ')} </Text>
                                </View>

                                <Text style={{ marginLeft: 8, color: "grey", fontSize: 15, fontWeight: "500" }} > {route.params.price * route.params.seats.length} <Text style={{ fontSize: 14, fontWeight: "500", color: "lightgray" }}>CFA </Text>  </Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
                                    <Text style={{ color: "black" }} > Email: </Text>
                                    {firebase.auth().currentUser.email}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 3, backgroundColor: '#f8fafc', gap: 10, borderRadius: 5, elevation: 10, padding: 8 }} >
                            {route.params.passengerInfo.map((x, ind) => {
                                return (
                                    <View key={ind}>
                                        <Text>Numéro de chaise: {x.seat} </Text>
                                        <Text>Nom: {x.name} </Text>
                                        <Text>Prénom: {x.surname} </Text>
                                        <Text>Numéro d'identité: {x.idNo} </Text>

                                    </View>

                                )
                            })}
                            <View style={{ elevation: 10, gap: 8 }} >
                                {/* {
                                    route.params.seats.map((seat, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{ padding: 2, flexDirection: "row", backgroundColor: "white", justifyContent: "space-between" }} >
                                                <View style={{ gap: 3 }}>

                                                    <View>
                                                        <View style={{}} >
                                                            <Text style={{ color: "gray", }} > Nom Prenom  </Text>
                                                            {seat.passengerInfo.fullName.map((x) => {
                                                                return (
                                                                    <View>

                                                                        <Text> Chaise No - <Text style={{ fontWeight: "900", fontSize: 16 }}>{seat.seatNumber}</Text> </Text>
                                                                        <Text style={{ fontWeight: "400", fontSize: 16 }} > {x} </Text>
                                                                    </View>

                                                                )
                                                            })}
                                                        </View>


                                                    </View>

                                                </View>

                                            </View>
                                        )
                                    })
                                } */}



                            </View>

                        </View>

                        {/*-- Payment Methods----------------------------------------------------------------------- */}
                        <View style={{ marginTop: 10, width: "100%", backgroundColor: "white", height: 445, gap: 10, borderRadius: 5, elevation: 2, padding: 5 }}>
                            <View style={{ backgroundColor: "white", height: 92, width: "100%" }}>
                                <Text style={{ fontWeight: "700", color: "orange", fontSize: 18, marginLeft: 4, }} >Mode de Paiement:</Text>

                                <View style={{ marginTop: 8, flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ gap: 8, flexDirection: "row", width: "98%", }} >
                                        <TouchableOpacity onPress={() => setSelectedPayment('MyNita')}>
                                            <View style={{ borderColor: "#ECA191", borderWidth: 2, backgroundColor: "white", borderRadius: 5, padding: 2 }}>
                                                <Text style={{ fontSize: 13, fontWeight: "600", color: "blue", }}> My Nita </Text>

                                                {/* <Text> partage et imprission </Text> */}
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSelectedPayment('Alizza')}>
                                            <View style={{ backgroundColor: "yellow", borderRadius: 5, padding: 2, borderWidth: 2, borderColor: "black", }}>
                                                <Text style={{ fontSize: 13, fontWeight: "600", color: "black", }}> Al Izza </Text>
                                            </View>
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => setSelectedPayment('card')}>
                                            <View style={{ borderColor: "orange", borderWidth: 2, backgroundColor: "#0D0DFF", borderRadius: 5, padding: 2 }}>
                                                <Text style={{ fontSize: 13, fontWeight: "600", color: "white", }}> Carte  </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSelectedPayment('AmanaTa')}>
                                            <View style={{ borderColor: "green", borderWidth: 2, backgroundColor: "orange", borderRadius: 5, padding: 2 }}>
                                                <Text style={{ fontSize: 13, fontWeight: "600", color: "white", }}> AmanaTa </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => setSelectedPayment('MoovFooz')}>
                                            <View style={{ backgroundColor: "#9ACD32", borderRadius: 5, padding: 2, borderWidth: 2, borderColor: "red", }}>
                                                <Text style={{ fontSize: 13, fontWeight: "600", color: "black", }}> Moov Fooz </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>



                            <View style={{ borderWidth: 1, borderColor: "orange", marginBottom: 5 }}>

                            </View>
                            {/* -----Phone Payment -------- */}
                            {selectedPayment === 'card' && <CardPayment />}
                            {selectedPayment === 'Alizza' && <Al_izzaPayment confirmBooking={confirmBooking} userData={userData} userId={userId} />}
                            {selectedPayment === 'AmanaTa' && <AmanaTa confirmBooking={confirmBooking} userData={userData} userId={userId} />}
                            {selectedPayment === 'MyNita' && <MyNitaPayment confirmBooking={confirmBooking} userData={userData} userId={userId} />}
                            {selectedPayment === 'MoovFooz' && <MoovFoozPayment confirmBooking={confirmBooking} userData={userData} userId={userId} />}

                            {/* <StripeApp confirmBooking={confirmBooking} userData={userData} userId={userId} /> */}

                            {/* -----Card Payment -------- */}

                            {/* <StripePayment confirmBooking={confirmBooking} userData={userData} userId={userId} /> */}



                        </View>



                    </View>





                    {/* <SafeAreaView>
                    <TouchableOpacity onPress={() => setShowPayment(!showPayment)} activeOpacity={0.75} />
                    <PaymentButton onPress={() => handlePayment(route)} />
                </SafeAreaView> */}

                </View>



            </ScrollView>



        </>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        // paddingTop: Platform.OS === 'android' ? 50 : 30,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f8fafc',
    }
})