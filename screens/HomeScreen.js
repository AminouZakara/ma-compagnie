import { ActivityIndicator, Alert, BackHandler, FlatList, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { firebase } from '@react-native-firebase/auth';
import BgLoaderScreen from './BgLoaderScreen';
import BgLoader from '../components/BgLoader';



const HomeScreen = () => {
    const navigation = useNavigation();
    const [depModal, setDepModal] = useState(false)
    const [destModal, setDestModal] = useState(false)


    const [inputDep, setInputDep] = useState("")
    const [inputDest, setInputDest] = useState("");
    const [inputTravelDate, setinputTravelDate] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    const route = useRoute();
    // console.log(route.params);




    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: false,
            title: "Mon Billet",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",


            },
            headerStyle: {
                backgroundColor: "green",
                height: 90,
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>


                    <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 12 }} />
                </View>

            )

        })
    }, [])


    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length > 0) return;

        const fetchProducts = async () => {
            const colRef = collection(db, "tickets");

            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                items.push(doc.data());
            })
        }

        fetchProducts();
    }, [items]);
    // console.log(items);

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
                setinputTravelDate(currentDate.toDateString());

            }
        } else {
            toggleDatePicker()
        }
    };
    const confirmIOSDate = () => {
        setinputTravelDate(date.toDateString());
        toggleDatePicker()
    }


    // ------- Serach Function ------------
    const searchTickes = () => {
        if (!inputDep || !inputDest || !inputTravelDate) {
            Alert.alert(
                "Detaille non Validé!",
                'Veuillez remplir tous les champs.',
                [
                    {
                        text: 'Cancel', onPress: () => console.log("Cancel Pressed"), style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => {
                            setInputDep('')
                            setInputDest('')
                            setinputTravelDate("");

                        }
                    }
                ],
                { cancelable: true }
            );
        }
        else if (inputDep === inputDest || !inputTravelDate) {
            Alert.alert(
                "Erreur de saisie!",
                'Le lieu de départ ne peut pas être le même que le lieu d\'arrivée.',
                [{
                    text: 'OK', onPress: () => {
                        setInputDep('')
                        setInputDest('')
                        setinputTravelDate("");
                    }
                }]
            )

        } else {
            navigation.navigate('Tickets', {
                inputDep: inputDep,
                inputDest: inputDest,
                inputTravelDate: inputTravelDate,

            });
        }
    }

    //get User
    const [userData, setUserData] = useState('');
    const userId = firebase.auth().currentUser.uid;

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
    console.log(" This User is:", userData?.role)

    useEffect(() => {
        getUser()

    }, []);

    console.log("user data : ", userData)

    const showRole = () => {
        if (userData.role === "Author") {
            return <View >
                <Pressable onPress={() => navigation.navigate('Author')}>
                    <Text>Welcome Author!</Text>

                </Pressable>
            </View>
        }
        else if (userData.role === "Admin") {
            return <View >
                <Pressable onPress={() => navigation.navigate('Admin')}>
                    <Text>Welcome Admin!</Text>

                </Pressable>
            </View>
        } else if (userData.role === "Editor") {
            return <View >
                <Pressable onPress={() => navigation.navigate('Editor')}>
                    <Text>Welcome Editor!</Text>
                </Pressable>
            </View>
        } else return null
    }

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
    // handleBack action if the screen is HomeScreen useFocusEffect
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Attendez!", "Êtes-vous sûr de vouloir quitter l'application ?",
                    [
                        {
                            text: "Non",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "Oui", onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: false }
                );
                return true;
            };
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [])
    );

    //     // Management screens
    //     const [userRole, setUserRole] = useState('')
    //     if (userData.role === "Author") {
    // setUserRole("Author")
    //     }
    return (
        <>
            <View style={styles.container}>

                {
                    isLoading ? (
                        <BgLoader />
                    ) : (
                        <>
                            <View>
                                <Header />
                                <ScrollView>
                                    <View>
                                        <View style={{ margin: 10 }} >
                                            <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", justifyContent: "center", marginTop: 10, alignItems: "center", width: "100%", height: 280 }}>
                                                {/* Round-Trip */}
                                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center", }}>
                                                    {/* Departure */}
                                                    <Pressable
                                                        onPress={() => {
                                                            setDepModal(!depModal)
                                                        }}
                                                        style={{
                                                            flexDirection: 'row',
                                                            paddingHorizontal: 35,
                                                            borderColor: "orange",
                                                            borderWidth: 1,
                                                            borderRadius: 8,
                                                            paddingHorizontal: 5,
                                                            paddingVertical: 3,
                                                            width: 150
                                                        }}
                                                    >
                                                        <FontAwesome5 name="map-marker-alt" size={24} color="orange" />
                                                        <TextInput
                                                            style={{ marginLeft: 10, fontSize: 16 }}
                                                            onChangeText={() => setInputDep(text => text)}
                                                            placeholder={inputDep ? inputDep : "Ville de Départ"}
                                                            placeholderTextColor={inputDep ? "black" : "grey"}
                                                            editable={false}
                                                        />
                                                        {/* <Text style={{ marginLeft: 20, fontSize: 16 }}>{route?.params ? route.params.inputDep : "Ville de Deprt"}</Text> */}
                                                    </Pressable>

                                                    <FontAwesome6 name="arrow-right-arrow-left" size={24} color="orange" />

                                                    {/* Destination */}

                                                    <Pressable
                                                        onPress={() => {
                                                            // navigation.navigate('Destination')
                                                            setDestModal(!destModal);
                                                        }}
                                                        style={{
                                                            flexDirection: 'row',
                                                            borderColor: "orange",
                                                            borderWidth: 1,
                                                            borderRadius: 8,
                                                            paddingHorizontal: 5,
                                                            paddingVertical: 3,
                                                            width: 150
                                                        }}>
                                                        <FontAwesome5 name="map-marker-alt" size={24} color="orange" />
                                                        <TextInput
                                                            style={{ marginLeft: 10, fontSize: 16 }}
                                                            onChangeText={() => setInputDest(text => text)}
                                                            placeholder={inputDest ? inputDest : "Ville d'Arrivée"}
                                                            placeholderTextColor={inputDest ? "black" : "grey"}
                                                            editable={false}
                                                        />
                                                        {/* <Text style={{ marginLeft: 20, fontSize: 16 }}>{route?.params ? route.params.inputDest : "Ville d Arrivée"} </Text> */}

                                                    </Pressable>

                                                </View>

                                                {/* Date and Time */}
                                                <Pressable

                                                    style={{ lexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center", marginTop: 30, }} >

                                                    <View

                                                        style={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            flexDirection: 'row',
                                                            borderColor: "orange",
                                                            borderWidth: 1,
                                                            borderRadius: 8,
                                                            paddingHorizontal: 5,
                                                            paddingVertical: 3,
                                                            width: 200,
                                                            height: 40,
                                                            color: "gray"
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
                                                                    >Annuler</Text>
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
                                                                    >Confirmer</Text>

                                                                </TouchableOpacity>
                                                            </View>
                                                        )}






                                                        {!showPicker && (
                                                            <Pressable onPress={toggleDatePicker}>
                                                                <TextInput
                                                                    style={{ fontSize: 18, textAlign: "center" }}
                                                                    // placeholder={new Date(item.eventDate).toLocaleString()}
                                                                    placeholder='Sélectionner une date'
                                                                    placeholderTextColor={'grey'}
                                                                    editable={false}
                                                                    value={inputTravelDate}
                                                                    onPressIn={toggleDatePicker}
                                                                />
                                                            </Pressable>
                                                        )}

                                                    </View>
                                                </Pressable>

                                                {/* Search Bar */}
                                                <Pressable
                                                    onPress={() => searchTickes(inputDep, inputDest, inputTravelDate)}
                                                    style={{
                                                        backgroundColor: "green",
                                                        width: "95%",
                                                        marginTop: 100,
                                                        marginHorizontal: 18,
                                                        alignItems: "center",
                                                        gap: 10,
                                                        borderColor: "green",
                                                        borderWidth: 1,
                                                        borderRadius: 8,
                                                        paddingVertical: 5,
                                                    }}>
                                                    <Text style={{ color: "white", fontSize: 20 }} >Recherche</Text>
                                                </Pressable>
                                            </View>
                                        </View>

                                        {/* Admin Pannel */}
                                        <>
                                            {
                                                userData.role === "user" ? (null) : (
                                                    <Pressable onPress={showRole} >
                                                        <View style={{ margin: 10, marginTop: 80 }}>
                                                            <View style={{ elevation: 0.5, borderRadius: 5, backgroundColor: "white", justifyContent: "center", marginTop: 30, alignItems: "center", width: "100%", height: 120 }}>
                                                                <Pressable
                                                                    onPress={() => {
                                                                        navigation.navigate(`${userData.role}`, {
                                                                            userData: userData,
                                                                        })
                                                                    }}
                                                                    style={{
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
                                                                    <Text style={{ fontSize: 15, color: "orange" }}>Bienvenue sur l'écran de l'{userData.role} </Text>
                                                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }} > {userData.name} </Text>

                                                                </Pressable>
                                                            </View>
                                                        </View>

                                                    </Pressable>
                                                )
                                            }

                                        </>
                                    </View>
                                </ScrollView>
                            </View>


                            {/* ------------------------ modals --------------------*/}

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
                                                <TextInput onChangeText={(text) => setInputDep(text)} placeholder='Choisissez votre ville de depart' />
                                                <Feather name="search" size={24} color="black" />
                                            </View>
                                        </SafeAreaView>
                                        <FlatList
                                            data={stations}
                                            renderItem={({ item }) => {
                                                return (
                                                    <Pressable
                                                        onPress={() => {
                                                            setInputDep(item.station);
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
                                                        setInputDest(item.station);
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
                        </>
                    )

                }

            </View>
        </>
    )
}
export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#075985",
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    }
})