// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import firebase from 'firebase';



// <FlatList
//     data={row2}
//     numColumns={2}
//     keyExtractor={item => item.id}
//   -----------  extraData={{ selectedSeats: selectedSeats }}----------------
//     renderItem={({ item }) => {
//         let row = Math.floor((item.id % 10) / 5); // 0-4 for Row A and B; 5-9 for Row
//         let color = "black";
//         if (selectedSeats.includes(item.number)) {
//             color = "#5cb85c"
//         }
//         return (
//             <Text style={[styles.text, { color: color }]}>
//                 {item.number}</Text>
//         );
//     }}
//     getItemLayout={(data, index) => (
//         { length: 70, offset: 70 * index }
//     )}
// />



// const TicketBookingStatusScreen = ({ route }) => {
//     const [selectedTickets, setSelectedTickets] = useState([]);
//     const [firebaseTickets, setFirebaseTickets] = useState([]);

//     useEffect(() => {
//         // Retrieve selected tickets from route parameters
//         const { selectedTickets: selected } = route.params;
//         setSelectedTickets(selected);

//         // Retrieve tickets from Firebase Database
//         const fetchFirebaseTickets = async () => {
//             try {
//                 const ticketsSnapshot = await firebase.database().ref('tickets').once('value');
//                 const ticketsData = ticketsSnapshot.val();
//                 if (ticketsData) {
//                     const ticketsArray = Object.values(ticketsData);
//                     setFirebaseTickets(ticketsArray);
//                 }
//             } catch (error) {
//                 console.error('Error fetching tickets from Firebase:', error);
//             }
//         };

//         fetchFirebaseTickets();
//     }, [route.params]);

//     // Function to compare selected tickets with Firebase tickets
//     const compareTickets = () => {
//         const comparisonResults = selectedTickets.map((selectedTicket) => {
//             const firebaseTicket = firebaseTickets.find((ticket) => ticket.id === selectedTicket.id);
//             if (firebaseTicket) {
//                 // Check if the ticket is booked
//                 return {
//                     id: selectedTicket.id,
//                     booked: firebaseTicket.booked,
//                 };
//             } else {
//                 // Firebase ticket not found
//                 return {
//                     id: selectedTicket.id,
//                     booked: false,
//                 };
//             }
//         });
//         return comparisonResults;
//     };

//     // Get comparison results
//     const results = compareTickets();
//     // const busItems = {
//     //     depPlace, destPlace, travelDate, companyName, travelHour, travelMinute, price, seatType, durationHour, durationMinute, By: user.email, TicketUserID: userID, userID: userID,
//     //     row1: route.params.row1.map((seat, seatId) => {
//     //         if (seatId === seat.selected === "true") {
//     //             return {
//     //                 ...seat,
//     //                 selected: seat.selected = "false",
//     //                 bookedBy: seat.bookedBy = user
//     //             }
//     //         } else {
//     //             return (
//     //                 console.log("Already Booked"),
//     //                 seat
//     //             )
//     //         }
//     //     }),
//     //     row2, row3

//     // }

//     return (
//         <View>
//             {results.map((result) => (
//                 <Text key={result.id}>
//                     {`Ticket ${result.id}: ${result.booked ? 'Booked' : 'Not Booked'}`}
//                 </Text>
//             ))}
//         </View>
//     );
// };

// export default TicketBookingStatusScreen;


// import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { useNavigation, useRoute } from '@react-navigation/native'
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useDispatch } from 'react-redux';
// import { savedTicket } from '../SavedReducer';
// import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// import { async } from '@firebase/util';

// const ConfirmationScreen = () => {
//     const route = useRoute()

//     const navigation = useNavigation();

//     useLayoutEffect(() => {
//         navigation.setOptions({

//             headerShown: true,
//             title: "Confirmation du Billet",

//             headerTitleStyle: {
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 color: "white",

//             },
//             headerStyle: {
//                 backgroundColor: "green",
//                 height: 110,
//                 borderBottomColor: "transparent",
//                 shadowColor: "transparent"



//             },
//             // USER Profile
//             // headerRight: () => (
//             //     <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 12 }} />
//             // )

//         })
//     }, [])

//     // UpdateTickets -------------------
//     const getTicketDetails = (type) => {
//         if (route.params) {
//             switch (type) {
//                 case "depPlace":
//                     return route.params.depPlace
//                 case "destPlace":
//                     return route.params.destPlace
//                 case "companyName":
//                     return route.params.companyName
//                 case "travelDate":
//                     return route.params.travelDate
//                 case "travelHour":
//                     return route.params.travelHour
//                 case "travelMinute":
//                     return route.params.travelMinute
//                 case "price":
//                     return route.params.price
//                 case "seatType":
//                     return route.params.seatType
//                 case "durationHour":
//                     return route.params.durationHour
//                 case "durationMinute":
//                     return route.params.durationMinute
//                 case "row1":
//                     return route.params.row1
//                 // .map(seat => {
//                 //     if (seat.value == route.params.seats) {
//                 //         return {
//                 //             ...seat,
//                 //             empty: seat.empty = "",
//                 //             value: seat.value = "222",

//                 //             selected: seat.selected = "false"
//                 //         }
//                 //     } else {
//                 //         return seat
//                 //     }
//                 // })
//                 case "row2":
//                     return route.params.row2
//                 // .map(seat => {
//                 //     if (seat.value == route.params.seats) {
//                 //         return {
//                 //             ...seat,
//                 //             // empty: seat.empty = "booked",
//                 //             // selected: seat.selected = "false"


//                 //         }
//                 //     } else {
//                 //         return seat
//                 //     }
//                 // })
//                 case "row3":
//                     return route.params.row3
//                 // .map(seat => {
//                 //     if (seat.value == route.params.seats) {
//                 //         return {
//                 //             ...seat,
//                 //             // empty: seat.empty = "booked",
//                 //             // selected: seat.selected = "false"


//                 //         }
//                 //     } else {
//                 //         return seat
//                 //     }
//                 // })

//             }


//         } else
//             return ""

//     };

//     const bookedTicket = route.params;
//     const userID = auth.currentUser?.uid;

//     const [depPlace, setDepPlace] = useState(getTicketDetails('depPlace'));
//     const [destPlace, setDestPlace] = useState(getTicketDetails('destPlace'));
//     const [travelDate, setTravelDate] = useState(getTicketDetails('travelDate'));
//     //Properties
//     const [companyName, setCompanyName] = useState(getTicketDetails('companyName'));
//     const [seatType, setSeatType] = useState(getTicketDetails('seatType'));
//     const [price, setPrice] = useState(getTicketDetails('price'));
//     const [availableSeats, setAvailableSeats] = useState(getTicketDetails('availableSeats'));
//     const [travelTime, setTravelTime] = useState(getTicketDetails('travelTime'));
//     const [travelHour, setTravelHour] = useState(getTicketDetails('travelHour'));
//     const [travelMinute, setTravelMinute] = useState(getTicketDetails('travelMinute'));
//     const [durationHour, setDdurationHour] = useState(getTicketDetails('durationHour'));
//     const [durationMinute, setDurationMinute] = useState(getTicketDetails('durationMinute'));
//     const [row1, setRow1] = useState(getTicketDetails('row1'));
//     const [row2, setRow2] = useState(getTicketDetails('row2'));
//     const [row3, setRow3] = useState(getTicketDetails('row3'))

//     const [firebaseTicketsRow1, setFirebaseTicketsRow1] = useState([]);
//     const [firebaseTicketsRow2, setFirebaseTicketsRow2] = useState([]);
//     const [firebaseTicketsRow3, setFirebaseTicketsRow3] = useState([]);

//     const [selectedTickets, setSelectedTickets] = useState(route.params._id);



//     // addBooking ticket to Firestore Database
//     const addBooking = async () => {
//         const confirmedTicket = {
//             companyName: bookedTicket.companyName,
//             passenger: bookedTicket.nom + " " + bookedTicket.prenom,
//             seatNumber: bookedTicket.seats,
//             depPlace: bookedTicket.depPlace,
//             price: bookedTicket.price,
//             travelHour: bookedTicket.travelHour,
//             travelMinute: bookedTicket.travelMinute,
//             durationMinute: bookedTicket.durationMinute,
//             phone: bookedTicket.phone,
//             destPlace: bookedTicket.destPlace,
//             durationHour: bookedTicket.durationHour,
//             email: bookedTicket.email,
//             userID: userID
//         }
//         console.log(confirmedTicket)
//         // Add a New Ticket
//         try {
//             // Add a new document with a generated id.
//             const docRef = await addDoc(collection(db, "bookings"), {
//                 ...confirmedTicket,
//             });
//             console.log("A new Booking has been conrfirmed successfully! ", docRef.id);
//             Alert.alert(
//                 //update Ticket
//                 `Confirmation`,
//                 `La réservation a été ajoutée avec succès!`,
//                 [

//                     {
//                         text: 'OK', onPress: () => console.log("A new Ticket has just been added")
//                     }
//                 ]
//             )

//         } catch (e) {
//             console.log(e);
//         }
//     }

//     const selectedSeats = route.params.seats;

//     const storeSeats = async () => {
//         const confirmedTicket = {
//             companyName: bookedTicket.companyName,
//             seats: bookedTicket.seats,
//             depPlace: bookedTicket.depPlace,
//             destPlace: bookedTicket.destPlace,
//             travelHour: bookedTicket.travelHour,
//             travelMinute: bookedTicket.travelMinute,
//         }
//         try {
//             const docSeats = addDoc(collection(db, "seats"), {
//                 ...confirmedTicket,
//             })
//             console.log("Seats successfully added")
//         }
//         catch (err) { console.log("Error adding seats", err) };
//     }

//     console.log("depPlace", depPlace);

//     const [isLoading, setIsLoading] = useState(false);
//     const [buses, setBuses] = useState([]);

//     useEffect(() => {
//         if (buses.length > 0) return // Avoid running useEffect if buses are already fetched

//         setIsLoading(true);
//         const fetchProducts = async () => {
//             const colRef = collection(db, "buses");
//             const docsSnap = await getDocs(colRef);
//             docsSnap.forEach((doc) => {
//                 buses.push({ id: doc.id, ...doc.data() });
//             })
//             setIsLoading(false);
//         }
//         fetchProducts();
//     }, [buses]);

//     console.log("buses............", buses);

//     buses?.filter((bus) => bus.id == route.params._id).map((ticket, index) => {
//         firebaseTicketsRow1.push({ ...ticket.row1, id: ticket.id, })
//         firebaseTicketsRow2.push({ ...ticket.row2, id: ticket.id, })
//         firebaseTicketsRow3.push({ ...ticket.row3, id: ticket.id, })
//         console.log("This is the id", ticket.id);
//     })

//     console.log("param id", route.params._id);
//     console.log("selected Seats...", selectedSeats);
//     console.log("firebase TicketsRow1..", firebaseTicketsRow1);
//     console.log("firebase TicketsRow2..", firebaseTicketsRow2);
//     console.log("firebase TicketsRow3..", firebaseTicketsRow3);

//     // Function to compare selected tickets with Firebase tickets
//     const compareTickets = () => {
//         const comparisonResults = selectedSeats.map((selectedTicket) => {
//             const firebaseTicket = firebaseTicketsRow1.find((ticket) => ticket.id === selectedTicket.id && ticket.empty === "available");
//             if (firebaseTicket) {
//                 // Check if the ticket is booked
//                 return {
//                     id: selectedTicket.id,
//                     booked: firebaseTicket.booked,
//                 };
//             } else {
//                 // Firebase ticket not found
//                 return {
//                     id: selectedTicket.id,
//                     booked: false,
//                 };
//             }
//         });
//         return comparisonResults;
//     };

//     // Get comparison results
//     const results = compareTickets();



//     const updateTicket = async () => {
//         const userID = auth.currentUser.uid;
//         const user = auth.currentUser;
//         const busItems = {
//             depPlace, destPlace, travelDate, companyName, travelHour, travelMinute, price, seatType, durationHour, durationMinute, By: user.email, TicketUserID: userID, userID: userID,
//             row1: route.params.row1.map(seat => {
//                 if (seat.selected == "true") {
//                     return {
//                         ...seat,
//                         selected: seat.selected = "false"
//                     }
//                 } else {
//                     return seat
//                 }
//             }),
//             row2, row3
//         }

//         try {
//             updateDoc(doc(db, "buses", route.params._id), busItems)

//             console.log('Success!', 'The first row of the ticket has been updated');

//         } catch (err) {
//             console.log("Failed to update ticket row 1", err);
//         }
//     }



//     const dispatch = useDispatch();
//     const confirmBooking = () => {
//         updateTicket();
//         // updateTicketRow1(selectedSeats[0].split('-')[0])
//         addBooking(dispatch, bookedTicket);
//         storeSeats(route.params.seats);
//         // dispatch(savedTicket(route.params));
//         navigation.navigate('Main');
//     }

//     return (
//         <>
//             <View key={route.params.id} style={styles.container}>
//                 <View style={{ width: "auto", borderRadius: 3, padding: 5 }} >
//                     <View>
//                         {results.map((result) => (
//                             <Text key={result.id}>
//                                 {`Ticket ${result.id}: ${result.booked ? 'Booked' : 'Not Booked'}`}
//                             </Text>
//                         ))}
//                     </View>

//                     <View style={{ backgroundColor: "white", gap: 15, borderRadius: 5, elevation: 10, padding: 8 }} >
//                         <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
//                             <Text style={{ fontSize: 18, fontWeight: "700", color: "gray" }}> {route.params.companyName} </Text>
//                             <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }} > {route.params.travelDate} </Text>
//                             <Text style={{ fontSize: 16, color: "gray", fontWeight: "500" }}> {route.params.travelHour} : {route.params.travelMinute} </Text>
//                         </View>

//                         <View>
//                             <Text style={{ fontSize: 12, fontWeight: "500" }} >  {route.params.depPlace} <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>Otogare </Text> {'--->'} {route.params.destPlace} <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>Otogare </Text> </Text>
//                         </View>

//                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
//                             <View style={{ flexDirection: "row" }} >
//                                 <FontAwesome5 name="user-alt" size={20} color="gray" />
//                                 <Text style={{ paddingLeft: 3, fontWeight: "500", fontSize: 16 }} > {route.params.seats.length}  <Text style={{ fontSize: 13, fontWeight: "500", color: "gray" }}>
//                                     {route.params.seats.length > 1 ? "Passagers " : "Passager "}
//                                 </Text>  </Text>
//                             </View>
//                             <Text style={{ fontWeight: "500", fontSize: 14 }} >
//                                 <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}> Chaise No:</Text> {selectedSeats.join(", ")}
//                             </Text>

//                             <Text style={{ marginLeft: 8, color: "grey", fontSize: 15, fontWeight: "500" }} > {route.params.price * route.params.seats.length} <Text style={{ fontSize: 14, fontWeight: "500", color: "lightgray" }}>CFA </Text>  </Text>
//                         </View>
//                     </View>

//                     <View style={{ marginTop: 3, backgroundColor: "white", gap: 10, borderRadius: 5, elevation: 10, padding: 8 }} >
//                         <View style={{ elevation: 10, gap: 15 }} >
//                             <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
//                                 <Text style={{ fontWeight: "400", fontSize: 16 }} >
//                                     <Text style={{ color: "gray", }} > Nom Prenom</Text>
//                                     {route.params.fullName}
//                                 </Text>

//                                 <Text style={{ fontSize: 16 }} >

//                                     <Text style={{ color: "gray", }} > ID No: </Text>
//                                     {route.params.IdNo}
//                                 </Text>
//                             </View>

//                             <View>
//                                 <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>
//                                     <Text style={{ color: "black" }} > Email: </Text>
//                                     {auth.currentUser.email}
//                                 </Text>
//                             </View>
//                         </View>

//                     </View>


//                     <View style={{ marginTop: 10, width: "auto", height: 300, backgroundColor: "white", gap: 10, borderRadius: 5, elevation: 2, padding: 8 }}>
//                         <View style={{}} >
//                             <Text style={{ fontSize: 14 }} > Payment Methods:
//                                 <Text style={{ color: "gray", fontSize: 11 }} > Bank Card / Credit Card / Nita / Zamani / Tel </Text>
//                             </Text>
//                         </View>

//                     </View>



//                 </View>





//                 {/* <SafeAreaView>
//                     <TouchableOpacity onPress={() => setShowPayment(!showPayment)} activeOpacity={0.75} />
//                     <PaymentButton onPress={() => handlePayment(route)} />
//                 </SafeAreaView> */}

//             </View>

//             <Pressable
//                 onPress={confirmBooking}
//                 style={{
//                     justifyContent: "center", alignItems: "center", backgroundColor: '#f8fafc',
//                 }} >
//                 <View style={{ marginBottom: 20, width: 200, backgroundColor: "green", borderRadius: 5, padding: 10 }} >
//                     <Text style={{ color: "white", fontSize: 24, fontWeight: "800", textAlign: "center", letterSpacing: 1 }} > Confirmer</Text>
//                 </View>
//             </Pressable>


//         </>
//     )
// }

// export default ConfirmationScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 5,
//         // paddingTop: Platform.OS === 'android' ? 50 : 30,
//         justifyContent: 'flex-start',
//         alignItems: 'stretch',
//         backgroundColor: '#f8fafc',
//     }
// })