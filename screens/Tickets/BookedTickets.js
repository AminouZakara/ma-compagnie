import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';


const BookedTickets = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const bookedTicket = route.params
    // console.log("User Role:", route.params.userData.role);

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Les Reservations",
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
                        onPress={() => {
                            navigation.navigate("AllTickets", {
                                userData: route.params.userData
                            })
                        }}

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <MaterialCommunityIcons name="bus-multiple" size={24} color="white" />
                        {/* <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Buses</Text> */}
                    </Pressable>
                </View>
            )
        })
    }, [])

    //getAllBookings ticket to Firestore Database
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


    }, [setAllBookings]);


    console.log("These are The Bookings Dependencies", allBookings);
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: "green", justifyContent: "center", alignItems: "center",
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
                paddingBottom: 6
            }}>
                <View style={{ backgroundColor: "green", paddingBottom: 4 }}>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}> {bookedTicket.companyName} </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 8 }}>
                    <Text style={{ color: "white", justifyContent: "center", alignItems: "baseline" }}> {bookedTicket.depPlace} <Feather name="arrow-right" size={16} color="white" /> {bookedTicket.destPlace} </Text>
                    <Text style={{ color: "white", }}> {bookedTicket.travelDate} </Text>
                    <Text style={{ color: "white", }}> {bookedTicket.travelHour} : {bookedTicket.travelMinute} </Text>
                </View>
            </View>


            <ScrollView>
                <View style={{}}>
                    {isLoading ? (
                        <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                            <Text style={{ padding: 15, backgroundColor: "orange", fontSize: 20, color: "white" }} >Fetching All Your Bookings</Text>
                            <Text style={{ color: "green", fontSize: 22, marginTop: 50 }} > Please wait </Text>
                        </View>
                    ) : (

                        <View style={{ paddingTop: 0, paddingHorizontal: 4, marginBottom: 20 }}>
                            {allBookings.filter((Bookings) => Bookings.busId === bookedTicket._id).map((item, indexi) => {
                                // if (item) {
                                return (
                                    <View key={indexi} style={{ borderRadius: 3, }} >
                                        {item.passengerInfo.map((passenger, index) => {
                                            return (
                                                <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "orange", borderColor: "green", borderRightColor: "blue", borderWidth: 3, width: 30, height: 29, borderBottomEndRadius: 0, borderTopEndRadius: 0, borderRadius: 20, }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>{passenger.seat}</Text>
                                                    </View>

                                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                                        <View
                                                            style={{ borderTopLeftRadius: 1, borderBottomLeftRadius: 1, alignItems: "center", height: 28, flexDirection: "row", backgroundColor: "white", elevation: 2, borderRadius: 4 }}
                                                            key={index}>

                                                            <Text style={{ fontSize: 15, fontWeight: "500", color: "red" }}> {passenger?.status} </Text>

                                                            <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}> {passenger.name} {passenger.surname} </Text>

                                                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}> <Text style={{ fontWeight: "500", }}> Tel: </Text> {item.userData.phoneNumber} </Text>

                                                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}> <Text style={{ fontWeight: "500", }}> Carte Id No: </Text>  {passenger.idNo} </Text>



                                                            <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }}> <Text style={{ fontWeight: "500", }}> Address: </Text>  {item.userData.address} </Text>


                                                        </View>
                                                    </ScrollView>
                                                </View>

                                            )
                                        })}

                                    </View>
                                )
                                // } else {
                                //     return (
                                //         <View style={{ marginTop: 10, alignItems: "center", justifyContent: "center" }} >
                                //             <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}> No Bookings Found </Text>
                                //         </View>
                                //     )
                                // }




                            })}
                        </View>
                    )
                    }

                </View>

            </ScrollView>
        </View>
    )
}

export default BookedTickets

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        // backgroundColor: "green",
        borderColor: "green",
        borderWidth: 0.5,
        borderBottomWidth: 10,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        borderTopWidth: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginHorizontal: 10,


    }
})