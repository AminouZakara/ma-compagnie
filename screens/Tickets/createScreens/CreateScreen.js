import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SearchBar } from 'react-native-screens';
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import hourList from '../../../components/HourList';
import minuteList from '../../../components/MinuteList';
import compagnie from '../../../components/Compagnies';
import priceList from '../../../components/PriceList';
import { Entypo } from '@expo/vector-icons';
import seatTypeList from '../../../components/SeatTypeList';
import { firebase } from '@react-native-firebase/auth';
import Loader from '../../../components/Loader';


const CreateScreen = () => {
    const navigation = useNavigation();
    const { windWidth } = Dimensions.get("window");
    const route = useRoute();
    const busTobeEdited = route.params;
    // console.log("busTobeEdited", busTobeEdited.row1);

    const [isLoading, setIsLoading] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Nouveau Bus",
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
                    {/* <Pressable
                        onPress={() => { navigation.navigate("Create") }}

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Ticket</Text>

                    </Pressable> */}

                </View>
            )
        })
    }, [])

    // Fetch UserData ----------------

    const userId = firebase.auth().currentUser.uid;
    const [userData, setUserData] = useState('');

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

    // ------- Select Travel Date Function ------------
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = (modeToShow) => {
        setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setTravelDate(currentDate.toDateString());

            }
        } else {
            toggleDatePicker()
        }
    };
    const confirmIOSDate = () => {
        setTravelDate(date.toDateString());
        toggleDatePicker()
    }

    // Add a New Bus
    const handleBus = async () => {
        const userID = firebase.auth().currentUser.uid;
        const user = firebase.auth().currentUser;
        const companyName = userData.companyName;
        const busItems = {
            depPlace, destPlace, travelDate, companyName, travelHour, travelMinute, price, seatType, durationHour, durationMinute, By: user.email, TicketUserID: userID, userID: userID,
            row1, row2, row3, createdAt: Date.now()
            // createdBy: userID,
            // assignedTo: '',
            // dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            // lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        }
        if (!depPlace || !destPlace || !travelDate ||
            !travelHour || !travelMinute || !price || !seatType || !durationHour || !durationMinute) {
            Alert.alert(
                "Detaille non Validé!",
                'Veuillez remplir tous les champs.',
                [
                    {
                        text: 'Cancel', onPress: () => console.log("Cancel Pressed"), style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => console.log("OK")
                    }
                ],
                { cancelable: true }
            );
        }
        else if (depPlace === destPlace) {
            Alert.alert(
                "Erreur de saisie!",
                'Le lieu de départ ne peut pas être le même que le lieu d\'arrivée.',
                [{
                    text: 'OK', onPress: () => {
                        setDepPlace('')
                        setDestPlace('')
                        // setinputTravelDate("");
                    }
                }]
            )

        }
        else {
            if (route.params) {
                //Update Bus
                Alert.alert(
                    //update Ticket
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment modifier ce bus?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: async () => {
                                try {
                                    setIsLoading(true)
                                    const docRef = await updateDoc(doc(db, "buses", route.params._id), {
                                        ...busTobeEdited,
                                        //canbeEdited...
                                        travelDate: travelDate,
                                        travelHour: travelHour,
                                        travelMinute: travelMinute,
                                        price: price,
                                        durationHour: durationHour,
                                        durationMinute: durationMinute,
                                        seatType: seatType,
                                        //canbeEdited...
                                        editedBy: user.email,
                                        editedDate: new Date().toISOString(),

                                    })
                                    console.log("Document with ID : ", docRef.id, "has just been updated");
                                    setIsLoading(false)

                                } catch (error) {
                                    console.log(error);
                                    setIsLoading(false)
                                }
                                Alert.alert(
                                    "Modification effectuée avec succès!",
                                    "Le bus a été modifié avec succès.",
                                    [{
                                        text: 'OK', onPress: () => {
                                            navigation.navigate("AllTickets");
                                        }
                                    }]
                                )
                            }
                        }
                    ]
                )
            }

            else {
                // Add a New Ticket
                try {
                    setIsLoading(true)
                    // Add a new document with a generated id.
                    const docRef = await addDoc(collection(db, "buses"), {
                        ...busItems,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setIsLoading(false)
                    Alert.alert(
                        //update Ticket
                        `Confirmation`,
                        `Le bus a été ajoutée avec succès! Voulez vous ajouter un autre bus?`,
                        [

                            {
                                text: 'Oui', onPress: () => console.log("A new Bus has just been added")
                            },
                            {
                                text: 'Non', onPress: () => {
                                    navigation.navigate("AllTickets");
                                    console.log("A new Bus has just been added")
                                }
                            }

                        ]
                    )

                } catch (e) {
                    console.log(e);
                    setIsLoading(false)
                }
            }

        }
    }

    // Update Bus  Form 
    console.log("Route.Params", route.params)
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

            }


        } else
            return ""

    };

    const [depPlace, setDepPlace] = useState(getTicketDetails('depPlace'));
    const [destPlace, setDestPlace] = useState(getTicketDetails('destPlace'));
    const [travelDate, setTravelDate] = useState(getTicketDetails('travelDate'));
    //Properties
    const [seatType, setSeatType] = useState(getTicketDetails('seatType'));
    const [price, setPrice] = useState(getTicketDetails('price'));
    const [availableSeats, setAvailableSeats] = useState(getTicketDetails('availableSeats'));
    const [travelTime, setTravelTime] = useState(getTicketDetails('travelTime'));
    const [travelHour, setTravelHour] = useState(getTicketDetails('travelHour'));
    const [travelMinute, setTravelMinute] = useState(getTicketDetails('travelMinute'));
    const [durationHour, setDdurationHour] = useState(getTicketDetails('durationHour'));
    const [durationMinute, setDurationMinute] = useState(getTicketDetails('durationMinute'));
    //Modals
    const [depModal, setDepModal] = useState(false)
    const [destModal, setDestModal] = useState(false)
    const [hourModal, setHourModal] = useState(false)
    const [minuteModal, setMuniteModal] = useState(false)
    const [priceModal, setPriceModal] = useState(false)
    const [seatTypeModal, setSeatTypeModal] = useState(false)
    const [durationHourModal, setDurationHourModal] = useState(false)
    const [durationMinuteModal, setDurationMinuteModal] = useState(false)


    //seats___________________-
    const [row1, setRow1] = useState([
        { value: 1, empty: "available", selected: "false" },
        { value: 2, empty: "available", selected: "false" },
        { value: 3, empty: "available", selected: "false" },
        { value: 4, empty: "available", selected: "false" },
        { value: 5, empty: "available", selected: "false" },
        { value: 6, empty: "available", selected: "false" },
        { value: 7, empty: "available", selected: "false" },
        { value: 8, empty: "available", selected: "false" },
        { value: 9, empty: "available", selected: "false" },
        { value: 10, empty: "available", selected: "false" },
        { value: 11, empty: "available", selected: "false" },
        { value: 12, empty: "available", selected: "false" },
        { value: 13, empty: "available", selected: "false" },
        { value: 14, empty: "available", selected: "false" },
        { value: 15, empty: "available", selected: "false" },
        { value: 16, empty: "available", selected: "false" },
        { value: 17, empty: "available", selected: "false" },
        { value: 18, empty: "available", selected: "false" },


    ]);
    const [row2, setRow2] = useState([
        { value: 19, empty: "available", selected: "false" },
        { value: 20, empty: "available", selected: "false" },
        { value: 21, empty: "available", selected: "false" },
        { value: 22, empty: "available", selected: "false" },
        { value: 23, empty: "available", selected: "false" },
        { value: 24, empty: "available", selected: "false" },
        { value: 25, empty: "available", selected: "false" },
        { value: 26, empty: "available", selected: "false" },
        { value: 27, empty: "available", selected: "false" },
        { value: 28, empty: "available", selected: "false" },
        { value: 29, empty: "available", selected: "false" },
        { value: 30, empty: "available", selected: "false" },
        { value: 31, empty: "available", selected: "false" },
        { value: 32, empty: "available", selected: "false" },
        { value: 33, empty: "available", selected: "false" },
        { value: 34, empty: "available", selected: "false" },
        { value: 35, empty: "available", selected: "false" },
        { value: 36, empty: "available", selected: "false" },
    ]);
    const [row3, setRow3] = useState([
        { value: 37, empty: "available", selected: "false" },
        { value: 38, empty: "available", selected: "false" },
        { value: 39, empty: "available", selected: "false" },
        { value: 40, empty: "available", selected: "false" },
        { value: 41, empty: "available", selected: "false" },
        { value: 42, empty: "available", selected: "false" },

    ]);


    // get Stations Function
    const [stations, setStations] = useState([]);
    useEffect(() => {
        if (stations.length > 0) return;

        setIsLoading(true);

        const colRef = collection(db, "stations");
        const unsub = onSnapshot(colRef, (snapshot) => {
            let results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            })
            setStations(results);
            setIsLoading(false);

        });
        // Cleanup function for unsubscribe when the component is dismounted
        return () => unsub();


    }, [setStations]);
    // console.log("stationsss....", stations);
    // console.log("User companyName....", userData.companyName);
    // console.log("Compagnies....", compagnie);
    return (
        <>
            <View>
                <Loader visible={isLoading} />
                <SafeAreaView style={{ padding: 10, }} >
                    <View style={{ marginTop: 10, borderColor: "", backgroundColor: "white", padding: 8, borderRadius: 10, elevation: 20 }} >
                        <View>
                            <View  >
                                {/* Compagnie Logo */}
                                <View
                                    style={{
                                        width: "80%",
                                        height: 60,
                                        borderRadius: 25,
                                        backgroundColor: "#f0f0f0",
                                        justifyContent: "center",
                                        alignSelf: "center",
                                        margin: 10,
                                    }}>

                                    <View style={{
                                        alignSelf: "center",
                                    }}>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> Compagnie de Transport : {userData.companyName} </Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    {/*__________Departure Place_________*/}
                                    <Pressable

                                        onPress={() => {
                                            setDepModal(!depModal)
                                        }}
                                        style={{
                                            borderColor: "green",
                                            backgroundColor: "green",
                                            width: Dimensions.get("window").width / 2, height: 50, alignItems: "center",
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            paddingHorizontal: 2,
                                            paddingVertical: 3,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            width: 160,
                                        }}
                                    >
                                        <TextInput
                                            style={{ marginHorizontal: 1, fontWeight: "500", color: "white", fontSize: 16, }}
                                            onChangeText={text => setDepPlace(text)}
                                            placeholder={depPlace ? depPlace : " Ville de Départ"}
                                            placeholderTextColor={depPlace ? 'white' : "white"}
                                            editable={false}
                                        />


                                    </Pressable>

                                    <FontAwesome6 name="arrow-right-arrow-left" size={24} color="green" />

                                    {/* Destination */}

                                    <Pressable
                                        onPress={() => {
                                            // navigation.navigate('Destination')
                                            setDestModal(!destModal);
                                        }}
                                        style={{
                                            borderColor: "green",
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            paddingHorizontal: 2,
                                            backgroundColor: "green",
                                            width: Dimensions.get("window").width / 2, height: 50, alignItems: "center",
                                            justifyContent: "center",
                                            paddingVertical: 3,
                                            alignItems: 'center',
                                            width: 160
                                        }}>
                                        <TextInput
                                            style={{ marginHorizontal: 1, fontWeight: "500", color: "white", fontSize: 16, }}
                                            onChangeText={() => setDestPlace(text => text)}
                                            placeholder={destPlace ? destPlace : "Ville d'Arrivée"}
                                            placeholderTextColor={destPlace ? 'white' : "white"}
                                            editable={false}
                                        />


                                    </Pressable>
                                </View>


                                {/* Date and Time */}
                                <View style={{ marginTop: 25, backgroundColor: "#F7F7FB", elevation: 5, borderRadius: 5 }}>
                                    <Pressable

                                        style={{}} >
                                        <View>
                                            <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> Choisir la date du voyage : </Text>

                                        </View>

                                        <View

                                            style={{
                                                marginTop: 5,
                                                alignItems: "center",
                                                flexDirection: 'row',
                                                color: "gray",

                                            }}>
                                            {showPicker && (
                                                <DateTimePicker
                                                    value={date}
                                                    is24Hour={true}
                                                    mode='date'
                                                    onChange={onChange}
                                                    minimumDate={new Date()}
                                                    maximumDate={new Date('2025-03-31')}
                                                    style={styles.datePicker}


                                                />
                                            )}
                                            {showPicker && Platform.OS === "ios" && (
                                                <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                                                    <TouchableOpacity style={[
                                                        styles.button,
                                                        styles.pickerButton,
                                                        { backgroundColor: "#11182711" }
                                                    ]}
                                                        onPress={toggleDatePicker}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.buttonText,
                                                                { color: '#075985' }
                                                            ]
                                                            }
                                                        >Cancel</Text>

                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={[
                                                        styles.button,
                                                        styles.pickerButton,
                                                    ]}
                                                        onPress={confirmIOSDate}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.buttonText,
                                                            ]
                                                            }
                                                        >Confirm</Text>

                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            {!showPicker && (
                                                <Pressable
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        width: "100%",
                                                        borderColor: "green",
                                                        borderBottomWidth: 2,
                                                        borderRadius: 8,

                                                    }}
                                                    onPress={toggleDatePicker}>
                                                    <TextInput
                                                        style={{ fontSize: 17, paddingLeft: 10, fontWeight: "500", color: travelDate ? "green" : "grey" }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}

                                                        placeholder={`MM/DD/YYYY`}

                                                        editable={false}
                                                        value={travelDate}
                                                        onPressIn={toggleDatePicker}
                                                    />
                                                    <Entypo name="check" size={18} color={travelDate ? "green" : "orange"} />

                                                </Pressable>
                                            )}

                                        </View>
                                    </Pressable>

                                </View>

                                {/*______________________  L'Heure du Voyage___________________*/}

                                <View style={{ marginTop: 25, flexDirection: "row", backgroundColor: "#F7F7FB", elevation: 5, borderRadius: 5 }}>
                                    <View>
                                        <View >
                                            <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> L'heure du Voyage: </Text>
                                        </View>

                                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderBottomWidth: 2, borderRadius: 8, borderColor: "green", }}>
                                            <View
                                                style={{ flexDirection: "row", alignItems: "center", }}>
                                                <Pressable
                                                    onPress={() => setHourModal(!hourModal)}
                                                    style={{
                                                        backgroundColor: travelHour ? "white" : " green",

                                                    }}>
                                                    <TextInput
                                                        style={{
                                                            fontSize: 26,
                                                            paddingLeft: 10
                                                        }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}
                                                        placeholder={travelHour ? travelHour : "00"}
                                                        onChangeText={text => setTravelHour(text)}
                                                        placeholderTextColor={travelHour ? "green" : "grey"}
                                                        editable={false}
                                                    // value={travelTime}
                                                    />

                                                </Pressable>
                                                <Text style={{ fontSize: 20, color: "grey", fontWeight: "500" }}> : </Text>
                                                <Pressable
                                                    onPress={() => setMuniteModal(!minuteModal)}
                                                    style={{
                                                        backgroundColor: travelMinute ? "white" : " green",
                                                        alignItems: "baseline",
                                                        borderRadius: 8,
                                                        flexDirection: "row",
                                                        justifyContent: "center"

                                                    }}>
                                                    <TextInput
                                                        style={{
                                                            fontSize: 26,
                                                        }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}
                                                        maxLength={2}
                                                        placeholder={travelMinute ? travelMinute : "00"}
                                                        onChangeText={text => setTravelMinute(text)}
                                                        placeholderTextColor={travelMinute ? "green" : "grey"}
                                                        editable={false}
                                                    // value={travelTime}
                                                    />

                                                </Pressable>
                                            </View>

                                            <Entypo name="check" size={20} color={travelHour && travelMinute ? "green" : "orange"} />
                                        </View>


                                    </View>

                                </View>

                                {/*_______________Montant _____________*/}
                                <View style={{ marginTop: 25, backgroundColor: "#F7F7FB", elevation: 5, borderRadius: 5 }}>
                                    <View>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> Montant : </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => setPriceModal(!priceModal)}
                                        style={{
                                            marginTop: 10,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 2,
                                            borderRadius: 8,
                                            borderColor: "green",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }} >
                                        <TextInput
                                            style={{
                                                fontSize: 20,
                                                fontWeight: "500",
                                                paddingLeft: 10

                                            }}
                                            placeholder={price ? price : 'Prix en CFA'}
                                            onChangeText={setPrice}
                                            placeholderTextColor={price ? 'green' : "grey"}
                                            editable={false}
                                        />
                                        <Entypo name="check" size={18} color={price ? "green" : "orange"} />

                                    </Pressable>
                                </View>



                                {/*______________________  SeatType ___________________*/}

                                <View style={{ marginTop: 25, backgroundColor: "#F7F7FB", elevation: 5, borderRadius: 5 }}>
                                    <View>
                                        <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> Seats Type </Text>
                                    </View>

                                    <Pressable
                                        onPress={() => setSeatTypeModal(!seatTypeModal)}
                                        style={{
                                            marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", borderBottomWidth: 2,
                                            borderRadius: 8, borderColor: "green"
                                        }}>
                                        <TextInput
                                            style={{
                                                fontSize: 20,
                                                fontWeight: "500",
                                                paddingLeft: 10

                                            }}
                                            // placeholder={new Date(item.eventDate).toLocaleString()}
                                            placeholder={seatType ? seatType : 'Seat Type'}
                                            onChangeText={setSeatType}
                                            placeholderTextColor={seatType ? 'green' : "grey"}
                                            editable={false}

                                        />
                                        <Entypo name="check" size={18} color={seatType ? "green" : "orange"} />

                                    </Pressable>
                                </View>

                                {/*______________________  Durée du Voyage ___________________*/}

                                <View style={{ marginTop: 25, flexDirection: "row", backgroundColor: "#F7F7FB", elevation: 5, borderRadius: 5 }}>
                                    <View>
                                        <View >
                                            <Text style={{ marginHorizontal: 1, fontSize: 14, fontWeight: "500" }}> Durée du Voyage: </Text>
                                        </View>

                                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderBottomWidth: 2, borderRadius: 8, borderColor: "green", }}>
                                            <View
                                                style={{ flexDirection: "row", alignItems: "center", }}>
                                                <Pressable
                                                    onPress={() => setDurationHourModal(!durationHourModal)}
                                                    style={{
                                                        backgroundColor: durationHour ? "white" : " green",

                                                    }}>
                                                    <TextInput
                                                        style={{
                                                            fontSize: 26,
                                                            paddingLeft: 10

                                                        }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}
                                                        placeholder={durationHour ? durationHour : "00"}
                                                        onChangeText={text => setDdurationHour(text)}
                                                        placeholderTextColor={durationHour ? "green" : "grey"}
                                                        editable={false}


                                                    // value={travelTime}
                                                    />

                                                </Pressable>
                                                <Text style={{ fontSize: 20, color: "grey", fontWeight: "500" }} > h </Text>
                                                <Pressable
                                                    onPress={() => setDurationMinuteModal(!durationMinuteModal)}
                                                    style={{
                                                        backgroundColor: durationMinute ? "white" : " green",
                                                        alignItems: "baseline",
                                                        borderRadius: 8,
                                                        flexDirection: "row",
                                                        justifyContent: "center"

                                                    }}>
                                                    <TextInput
                                                        style={{
                                                            fontSize: 26,
                                                        }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}
                                                        maxLength={2}
                                                        placeholder={durationMinute ? durationMinute : "00"}
                                                        onChangeText={text => setDurationMinute(text)}
                                                        placeholderTextColor={durationMinute ? "green" : "grey"}
                                                        editable={false}
                                                    // value={travelTime}
                                                    />

                                                </Pressable>
                                            </View>

                                            <Entypo name="check" size={20} color={durationHour && durationMinute ? "green" : "orange"} />
                                        </View>


                                    </View>

                                </View>





                            </View>

                            <View style={{ justifyContent: "center", flexDirection: "row", marginBottom: 10 }}>
                                {route.params ?
                                    <Pressable
                                        onPress={() => handleBus()}
                                        style={{
                                            marginTop: 60, backgroundColor: "green", width: 358, paddingHorizontal: 5, height: 45,
                                            paddingVertical: 3, alignItems: "center", justifyContent: "center", borderRadius: 5, paddingVertical: 4
                                        }}
                                    >
                                        <Text style={{ marginHorizontal: 1, fontSize: 20, fontWeight: "600", color: "white" }}>Update</Text>
                                    </Pressable>
                                    :
                                    <Pressable
                                        onPress={handleBus}
                                        style={{
                                            marginTop: 60, backgroundColor: "green", width: 358, paddingHorizontal: 5, height: 45,
                                            paddingVertical: 3, alignItems: "center", justifyContent: "center", borderRadius: 5, paddingVertical: 4
                                        }}
                                    >
                                        <Text style={{ marginHorizontal: 1, fontSize: 20, fontWeight: "600", color: "white" }}>Ajouter</Text>
                                    </Pressable>


                                }

                            </View>
                        </View>

                        {/*_____________________________________________________  Modals _____________________________________________________*/}

                        {/*______________________ Departure Modal___________________*/}

                        <BottomModal
                            swipeThreshold={200}
                            onBackdroPress={(e) => setDepModal(!depModal)}
                            swipeDirection={['up', 'down']}

                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", justifyContent: "space-between", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Ville de départ : </Text>}
                            />}

                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setDepModal(!depModal)}
                            visible={depModal}
                            onTouchOutside={(e) => setDepModal(!depModal)}
                        >

                            <ModalContent style={{ width: "100%", height: 450 }}>
                                <View style={{}}>
                                    <SafeAreaView>
                                        <View style={{
                                            padding: 6,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: "orange",
                                            borderWidth: 2,
                                            borderRadius: 10,
                                            marginVertical: 5,
                                            marginBottom: 5,
                                        }} >
                                            <TextInput onChangeText={(text) => setDepPlace(text)} placeholder='Choisissez votre ville de depart' />
                                            <Feather name="search" size={24} color="black" />
                                        </View>


                                    </SafeAreaView>
                                    <FlatList
                                        data={stations}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable
                                                    onPress={() => {
                                                        setDepPlace(item.station);
                                                        setDepModal(!depModal)
                                                    }}
                                                    key={item.id}>
                                                    <View style={{ marginVertical: 10 }}>
                                                        <Text> {item.station} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ Destination Modal________________________*/}
                        <BottomModal
                            swipeThreshold={200}
                            onBackdroPress={(e) => setDestModal(!destModal)}
                            swipeDirection={['up', 'down',]}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", justifyContent: "space-between", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Ville d'Arrivée : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setDestModal(!destModal)}
                            visible={destModal}
                            onTouchOutside={(e) => setDestModal(!destModal)}
                        >

                            <ModalContent style={{ width: "100%", height: 450 }}>
                                <View style={{}}>
                                    <SafeAreaView>
                                        <View style={{
                                            padding: 6,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: "orange",
                                            borderWidth: 2,
                                            borderRadius: 10,
                                            marginVertical: 5,
                                            marginBottom: 5,
                                        }} >
                                            <TextInput placeholder='Choisissez votre ville d Arrivee' />
                                            <Feather name="search" size={24} color="black" />
                                        </View>
                                    </SafeAreaView>
                                    <FlatList
                                        data={stations}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setDestPlace(item.station);
                                                    setDestModal(!destModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10 }}>
                                                        <Text> {item.station} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ HourModel Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setHourModal(!hourModal)}
                            swipeDirection={['up', 'down',]}
                            width={60}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >L'Heure : </Text>}
                            />}

                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setHourModal(!hourModal)}
                            visible={hourModal}
                            onTouchOutside={(e) => setHourModal(!hourModal)}
                        >

                            <ModalContent style={{ width: "30%", height: 450 }}>
                                <View style={{}}>

                                    <FlatList
                                        data={hourList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setTravelHour(item.hour);
                                                    setHourModal(!hourModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", width: 45, borderRadius: 10, alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.hour} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ MinuteModel Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setMuniteModal(!minuteModal)}
                            swipeDirection={['up', 'down',]}
                            width={60}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Minute : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setMuniteModal(!minuteModal)}
                            visible={minuteModal}
                            onTouchOutside={(e) => setMuniteModal(!minuteModal)}
                        >

                            <ModalContent style={{ width: "30%", height: 450 }}>
                                <View style={{}}>

                                    <FlatList
                                        data={minuteList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setTravelMinute(item.minute);
                                                    setMuniteModal(!minuteModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", width: 45, borderRadius: 10, alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.minute} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>



                        {/*____________________ Montant (Prix) Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setPriceModal(!priceModal)}
                            swipeDirection={['up', 'down',]}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Compagnie : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setPriceModal(!priceModal)}
                            visible={priceModal}
                            onTouchOutside={(e) => setPriceModal(!priceModal)}
                        >

                            <ModalContent
                                style={{
                                    height: 450
                                }}>
                                <View style={{}}>

                                    <FlatList
                                        data={priceList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setPrice(item.prix);
                                                    setPriceModal(!priceModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", borderRadius: 5, }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.prix} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ SeatType Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setSeatTypeModal(!seatTypeModal)}
                            swipeDirection={['up', 'down',]}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Compagnie : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setSeatTypeModal(!seatTypeModal)}
                            visible={seatTypeModal}
                            onTouchOutside={(e) => setSeatTypeModal(!seatTypeModal)}
                        >

                            <ModalContent
                                style={{
                                    height: 450
                                }}>
                                <View style={{}}>

                                    <FlatList
                                        data={seatTypeList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setSeatType(item.seatType);
                                                    setSeatTypeModal(!seatTypeModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", borderRadius: 5, }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.seatType} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ DurationHour Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setDurationHourModal(!durationHourModal)}
                            swipeDirection={['up', 'down',]}
                            width={60}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >L'Heure : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setDurationHourModal(!durationHourModal)}
                            visible={durationHourModal}
                            onTouchOutside={(e) => setDurationHourModal(!durationHourModal)}
                        >

                            <ModalContent style={{ width: "30%", height: 450 }}>
                                <View style={{}}>

                                    <FlatList
                                        data={hourList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setDdurationHour(item.hour);
                                                    setDurationHourModal(!durationHourModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", width: 45, borderRadius: 10, alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.hour} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>

                        {/*____________________ DurationMinute Modal________________________*/}
                        <BottomModal
                            swipeThreshold={50}
                            onBackdroPress={(e) => setDurationMinuteModal(!durationMinuteModal)}
                            swipeDirection={['up', 'down',]}
                            width={60}


                            modalTitle={<ModalTitle
                                style={{ backgroundColor: "green", flexDirection: "row" }}
                                title={<Text style={{ color: "white", fontSize: 20, }} >Minute : </Text>}
                            />}



                            modalAnimation={
                                new SlideAnimation({
                                    slideFrom: 'bottom'
                                })
                            }
                            onHardwareBackPress={() => setDurationMinuteModal(!durationMinuteModal)}
                            visible={durationMinuteModal}
                            onTouchOutside={(e) => setDurationMinuteModal(!durationMinuteModal)}
                        >

                            <ModalContent style={{ width: "30%", height: 450 }}>
                                <View style={{}}>

                                    <FlatList
                                        data={minuteList}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable onPress={() => {
                                                    setDurationMinute(item.minute);
                                                    setDurationMinuteModal(!durationMinuteModal)
                                                }}
                                                >
                                                    <View style={{ marginVertical: 10, backgroundColor: "green", width: 45, borderRadius: 10, alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }} > {item.minute} </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                        }
                                    />

                                </View>
                            </ModalContent>
                        </BottomModal>




                    </View>
                </SafeAreaView>

            </View>
        </>



    )
}

export default CreateScreen

const styles = StyleSheet.create({})