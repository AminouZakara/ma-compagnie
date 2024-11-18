import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { BottomModal, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

let selectedSeats = [];
let bookedSeats = [];

const FilTicketCard = ({ By, userID, TicketUserID, _id, row_1, row_2, row_3, companyName, travelHour, travelMinute, price, seatType, durationHour, durationMinute, depPlace, destPlace, travelDate }) => {
    const navigation = useNavigation();
    const [checkTicketModal, setCheckTicketModal] = useState(false);


    const [row1, setRow1] = useState(row_1);
    const [row2, setRow2] = useState(row_2);
    const [row3, setRow3] = useState(row_3);

    // console.log("OKay", _id)


    const onSelectRow1 = index => {
        let tempRow = [];
        tempRow = row1;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected === "true") {
                    item.selected = "false";
                    item.empty = "available";
                } else {
                    item.selected = "true";
                    item.empty = "booked";
                }
            }
        });

        let tempSeats = [];
        tempRow.map((item) => {
            tempSeats.push(item);
        });
        setRow1(tempSeats);

    };

    const onSelectRow2 = index => {
        let tempRow = [];
        tempRow = row2;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected === "true") {
                    item.selected = "false";
                    item.empty = "available";
                } else {
                    item.selected = "true";
                    item.empty = "booked";
                }
            }
        });

        let tempSeats = [];
        tempRow.map((item) => {
            tempSeats.push(item);
        });
        setRow2(tempSeats);

    };

    const onSelectRow3 = index => {
        let tempRow = [];
        tempRow = row3;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected === "true") {
                    item.selected = "false";
                    item.empty = "available";
                } else {
                    item.selected = "true";
                    item.empty = "booked";
                }
            }
        });

        let tempSeats = [];
        tempRow.map((item) => {
            tempSeats.push(item);
        });
        setRow3(tempSeats);

    };

    // console.log("From ROW1", row1);

    const getAllSeats = () => {
        selectedSeats = []
        bookedSeats = []
        row1.map((item, index) => {
            if (item.selected == "true") {
                selectedSeats.push(item.value);
                bookedSeats.push(index, item.value);
            }
        });
        row2.map((item, index) => {
            if (item.selected === "true") {
                selectedSeats.push(item.value);
                bookedSeats.push(index, item.value);

            }
        });
        row3.map((item, index) => {
            if (item.selected === "true") {
                selectedSeats.push(item.value);
                bookedSeats.push(index, item.value);

            }
        });
        return selectedSeats.join(", ");
    }

    // console.log("Hh", bookedSeats.join(","))
    // console.log("Row1", row1);
    // console.log("Row_1", row_1);




    // const [bookedS, setBookedS] = useState([])
    // const [isLoading, setIsLoading] = useState(false);
    // const [allBookedSeats, setAllBookedSeats] = useState([]);
    // useEffect(() => {
    //     if (allBookedSeats.length > 0) return;
    //     setIsLoading(true);

    //     const getAllBookedSeatsFromDB = async () => {
    //         const colRef = collection(db, "seats");
    //         const docsSnap = await getDocs(colRef);
    //         docsSnap.forEach((doc) => {
    //             allBookedSeats.push({ id: doc.id, ...doc.data() });
    //         })
    //         setIsLoading(false);
    //     }
    //     getAllBookedSeatsFromDB();
    // }, [allBookedSeats]);
    // console.log("These are The Booked Seats", allBookedSeats);

    // console.log("BookedSeatssss:", allBookedSeats)







    return (
        <View style={{ padding: 10, }} >

            <View style={{ backgroundColor: "white", borderTopLeftRadius: 5, marginBottom: 2, borderBottomColor: "orange", borderBottomWidth: 0.5, borderTopRightRadius: 5, width: "100%", height: 112, gap: 5 }} >

                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }} >
                    <View style={{ width: "33%", justifyContent: "flex-start", paddingLeft: 5 }} >
                        <Text style={{ fontSize: 20, fontWeight: "500" }} > {companyName} </Text>


                    </View>

                    <View style={{ width: "33%", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                        <MaterialIcons name="departure-board" size={24} color="green" />
                        <Text style={{ fontWeight: "500", fontSize: 18 }} > {travelHour} :  {travelMinute}</Text>
                    </View>

                    <View style={{ width: "33%", height: 35, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", }} >
                        <Text style={{ fontWeight: "500", borderRadius: 5, fontSize: 20, color: "green", backgroundColor: "orange", paddingHorizontal: 2 }} >

                            {price}
                            <Text style={{ color: "white" }} > CFA</Text>

                        </Text>
                    </View>


                </View>

                <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ width: "38%", flexDirection: "row", paddingLeft: 10, alignItems: "center" }} >
                        <MaterialCommunityIcons name="seat-passenger" size={20} color="orange" />
                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "400" }}> {seatType} </Text>
                    </View>

                    <View style={{ width: "62%", flexDirection: "row", alignItems: "center" }} >
                        <MaterialCommunityIcons name="alarm-check" size={18} color="gray" />
                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "400" }}> {durationHour}h {durationMinute}mn </Text>
                    </View>

                </View>

                <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ flexDirection: "row", paddingLeft: 5, justifyContent: "space-between", marginTop: 8 }}>
                        <Text style={{ fontSize: 12, fontWeight: "400" }} >  {depPlace} Otogare {'--->'} {destPlace} Otogare</Text>
                    </View>
                </View>

            </View>

            <Pressable
                onPress={() => setCheckTicketModal(!checkTicketModal)}
            >
                <View style={{ borderTopColor: "orange", borderTopWidth: 0.5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: "white", padding: 2, width: "100%", height: 35 }}>
                    <View style={{ paddingTop: 2, width: "100%", height: 35, gap: 2, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", paddingRight: 5 }}>
                        <Text style={{ marginRight: 4, color: "gray", fontWeight: "500", fontStyle: "italic" }} >Check</Text>
                        <FontAwesome6 name="check-double" size={12} color="green" />

                    </View>
                </View>

                <BottomModal
                    swipeThreshold={0.7}
                    onBackdroPress={(e) => setCheckTicketModal(!checkTicketModal)}
                    swipeDirection={['up', 'down']}
                    footer={<ModalFooter>
                        <Pressable
                            onPress={() => {
                                setCheckTicketModal(!checkTicketModal)
                                navigation.navigate('User', {
                                    By: By,
                                    userID: userID,
                                    TicketUserID: TicketUserID,
                                    companyName: companyName,
                                    travelHour: travelHour,
                                    travelMinute: travelMinute,
                                    price: price,
                                    seatType: seatType,
                                    durationHour: durationHour,
                                    durationMinute: durationMinute,
                                    depPlace: depPlace,
                                    destPlace: destPlace,
                                    seats: selectedSeats,
                                    travelDate: travelDate,
                                    row1: row1,
                                    row2: row2,
                                    row3: row3,
                                    _id: _id

                                })
                            }}
                            style={{ paddingRight: 10, marginLeft: "auto", marginRight: "auto", marginVertical: 10, height: 29, justifyContent: "center", alignItems: "center", }} >
                            {getAllSeats().length > 0 && (

                                <Text
                                    style={{ fontWeight: "400", backgroundColor: "green", color: "white", fontSize: 20, borderRadius: 10, paddingHorizontal: 15, paddingBottom: 4 }}>Apply and Continue</Text>
                            )}

                        </Pressable>
                    </ModalFooter>}

                    modalTitle={<ModalTitle
                        style={{ width: "100%", backgroundColor: "green", flexDirection: "row" }}
                        title={<View >
                            <Text style={{ color: "white", fontSize: 20, }} >Choose Your Seat!</Text>
                        </View>}

                    />}

                    modalAnimation={
                        new SlideAnimation({
                            slideFrom: 'bottom'
                        })
                    }
                    onHardwareBackPress={() => setCheckTicketModal(!checkTicketModal)}
                    visible={checkTicketModal}
                    onTouchOutside={(e) => setCheckTicketModal(!checkTicketModal)}
                >
                    <ModalContent style={{ width: "100%", height: 470 }} >
                        <View style={{ flexDirection: "row", height: 470, marginTop: 5, }}>

                            <View style={{ width: "38%" }}>
                                {/* map through all the seats and display them */}
                                <View style={{ marginTop: 10, gap: 20 }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Text style={{ fontSize: 14 }}> Empty: </Text>
                                        <View style={{ backgroundColor: "white", borderColor: "green", borderWidth: 1, width: 25, height: 25, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Text style={{ fontSize: 14 }}> Full: </Text>
                                        <View style={{ backgroundColor: "lightgrey", borderColor: "green", borderWidth: 1, width: 25, height: 25, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ marginTop: 30, paddingRight: 5, }} >
                                    {getAllSeats().length > 0 && (
                                        <View style={{ gap: 2 }}>
                                            <Text style={{ fontSize: 14, fontWeight: "500", }} > Selected Seats:</Text>
                                            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, }}>
                                                {selectedSeats.map((seat, index) => {
                                                    return (
                                                        <View key={index} style={{ backgroundColor: "green", borderColor: "green", borderWidth: 1, width: 28, height: 28, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                            <Text style={{ fontWeight: "500", color: "white", fontSize: 16 }}> {seat} </Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>

                                        </View>

                                    )}
                                </View>
                                <View style={{ marginTop: 30, paddingRight: 6, height: 85 }}>
                                    <Text>

                                    </Text>

                                </View>

                                <View style={{ marginTop: 30, paddingRight: 6 }}>
                                    {getAllSeats().length > 0 && (
                                        <View style={{ gap: 2 }}>
                                            <Text style={{ fontSize: 15, fontWeight: "500" }}> Price of<Text style={{ color: "grey" }}> {selectedSeats.length}</Text> {selectedSeats.length > 1 ? "seats" : "seat"}:</Text>
                                            <View style={{ backgroundColor: "white", flexDirection: "row", alignItems: "center", borderColor: "white", borderWidth: 2, borderRadius: 5, paddingVertical: 5, elevation: 5, justifyContent: "space-between" }}>
                                                <Text style={{ color: "green", fontSize: 18, fontWeight: "500" }}> {price * selectedSeats.length} </Text>
                                                <Text style={{ paddingRight: 4, color: "grey", fontSize: 18, fontWeight: "500" }}>FCFA</Text>

                                            </View>
                                        </View>
                                    )}

                                </View>

                            </View>

                            {/* ----- Select Your Seat --------- */}

                            <View style={{ width: "65%", flexDirection: "column", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderRadius: 10, borderWidth: 2, borderColor: "green", height: "97%", }} >

                                <View style={{ borderBottomWidth: 1.5, borderRadius: 30, borderColor: "green", width: "100%", justifyContent: "center", alignSelf: "center", marginBottom: 4 }}>
                                    <MaterialCommunityIcons name="steering" size={28} style={{ margin: 5, marginTop: 8, marginLeft: 8 }} color="lightgrey" />
                                </View>

                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                    <View>
                                        <FlatList
                                            data={row1}
                                            numColumns={2}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <Pressable
                                                        onPress={() => {
                                                            if (item.selected == "false" && item.empty == "booked") {
                                                                alert("This seat is already booked!");
                                                            } else {
                                                                onSelectRow1(index);
                                                                console.log("Row1ID:", index)

                                                            }
                                                        }}
                                                        style={{ marginHorizontal: 4, marginVertical: 5, gap: 5 }}>
                                                        {
                                                            item.empty == "booked" && item.selected == "true" ? (
                                                                <View style={{ backgroundColor: "green", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : item.empty == "available" && item.selected == "false" ? (
                                                                <View style={{ borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : item.empty == "booked" && item.selected == "false" ? (
                                                                <View style={{ backgroundColor: "lightgrey", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ color: "grey", fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : null
                                                        }
                                                    </Pressable>
                                                )
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <FlatList
                                            data={row2}
                                            numColumns={2}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <Pressable
                                                        onPress={() => {
                                                            if (item.selected == "false" && item.empty == "booked") {
                                                                alert("This seat is already booked!");
                                                            } else {
                                                                onSelectRow2(index);
                                                                console.log("Row2_ID:", index)

                                                            }
                                                        }}
                                                        style={{ marginHorizontal: 4, marginVertical: 5, gap: 5 }}>
                                                        {
                                                            item.empty == "booked" && item.selected == "true" ? (
                                                                <View style={{ backgroundColor: "green", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : item.empty == "available" && item.selected == "false" ? (
                                                                <View style={{ borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : item.empty == "booked" && item.selected == "false" ? (
                                                                <View style={{ backgroundColor: "lightgrey", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                    <Text style={{ color: "grey", fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                                </View>
                                                            ) : null
                                                        }
                                                    </Pressable>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <FlatList
                                        data={row3}
                                        horizontal
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Pressable
                                                    onPress={() => {
                                                        if (item.selected == "false" && item.empty == "booked") {
                                                            alert("This seat is already booked!");
                                                        } else {
                                                            onSelectRow3(index);
                                                            console.log("Row3_ID:", index)

                                                        }
                                                    }}
                                                    style={{ marginHorizontal: 4, marginVertical: 5, gap: 5 }}>
                                                    {
                                                        item.empty == "booked" && item.selected == "true" ? (
                                                            <View style={{ backgroundColor: "green", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                            </View>
                                                        ) : item.empty == "available" && item.selected == "false" ? (
                                                            <View style={{ borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                <Text style={{ fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                            </View>
                                                        ) : item.empty == "booked" && item.selected == "false" ? (
                                                            <View style={{ backgroundColor: "lightgrey", borderColor: "green", borderWidth: 1, width: 30, height: 30, borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                                                <Text style={{ color: "grey", fontWeight: "500", fontSize: 16 }}> {item.value} </Text>
                                                            </View>
                                                        ) : null
                                                    }
                                                </Pressable>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ModalContent>
                </BottomModal>
            </Pressable >
        </View >
    )
}

export default FilTicketCard

const styles = StyleSheet.create({})