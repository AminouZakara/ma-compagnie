import { Alert, Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AddButton from '../components/AddButton';

const UserScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    //// TicketUserID means the person who added the Bus ID

    // console.log("Here We go", route.params.seats);




    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: " Les Informations du Passager ",

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

    // get The userData and save with the selected seats
    const [userData, setUserData] = useState('');
    const userId = auth.currentUser?.uid;
    const user = auth.currentUser;
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

    const appliquerEtContinuer = () => {
        if (route.params.seats.length != passengerInfo.length) {
            Alert.alert(
                "Detaille non Validé!",
                'Veuillez remplir tous les champs.',
                [
                    {
                        text: 'Cancel', onPress: () => console.log("Cancel Pressed"), style: 'cancel'
                    },

                    {
                        text: 'OK', onPress: () => console.log('OK Pressed')
                    }
                ],
                { cancelable: false }
            );
        } else {
            // navigation.navigate("")
            navigation.navigate("confirmation", {
                By: route.params.By,
                userID: route.params.userID,
                TicketUserID: route.params.TicketUserID,
                companyName: route.params.companyName,
                travelHour: route.params.travelHour,
                travelMinute: route.params.travelMinute,
                price: route.params.price,
                seatType: route.params.seatType,
                durationHour: route.params.durationHour,
                durationMinute: route.params.durationMinute,
                depPlace: route.params.depPlace,
                destPlace: route.params.destPlace,
                travelDate: route.params.travelDate,
                _id: route.params._id,
                row1: route.params.row1,
                row2: route.params.row2,
                row3: route.params.row3,
                selectedSeats: route.params.seats,
                passengerInfo: passengerInfo,
                seats: route.params.seats

                // seats: route.params.seats.map((seat => {
                //     return {
                //         passengerInfo: {
                //             seatNumber: seat,
                //             fullName: fullName,
                //             IdNo: IdNo
                //         }
                //     }
                // }))
            })
        }

    }
    // console.log(route.params._id);
    // console.log("Row 1 Active", route.params.row1);

    const passengerSchema = Yup.object({
        name: Yup.string().required("Nom est obligatoire")
            // .matches(/^[a-zA-Z]+$/, "Nom doit contenir des lettres")
            .min(2, "Nom doit contenir au moins 2 lettres")
            .max(20, "Nom doit contenir au plus 20 lettres"),
        surname: Yup.string().required("Prénom est obligatoire")
            // .matches(/^[a-zA-Z]+$/, "Prénom doit contenir des lettres")
            .min(2, "Prénom doit contenir au moins 2 lettres")
            .max(20, "Prénom doit contenir au plus 20 lettres"),
        idNo: Yup.string().required("ID No est obligatoire")
            .matches(/^[0-9]+$/, "Numéro d'identité doit contenir des chiffres")
            .min(8, "Numéro d'identité doit contenir 8 chiffres")
            .max(8, "Numéro d'identité doit contenir 8 chiffres"),
    })


    const [passengerInfo, setPassengerInfo] = useState([])
    const addPassenger = (passenger) => {
        setPassengerInfo([...passengerInfo, passenger])
    }
    console.log("Seats Length", route.params.seats.length);
    console.log("Passenger Length", passengerInfo.length);


    return (
        <>
            <View style={{ flex: 1, padding: 15, gap: 5 }} >
                <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ color: "grey" }}>
                        {route.params.depPlace} <Text style={{ color: "black" }}> To </Text> {route.params.destPlace}
                    </Text>

                    <Text> Date:  <Text style={{ color: "grey" }}> {route.params.travelDate} </Text> </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >

                    {route.params.seats.map(((seat, index) => (
                        <ScrollView key={index} style={{ gap: 10, marginBottom: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "500", fontSize: 18 }}>Numéro de chaise: </Text>
                                <View style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center", borderRadius: 20, borderWidth: 2, borderColor: "green", backgroundColor: "orange", }}>
                                    <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>{seat}</Text>
                                </View>

                            </View>
                            <Formik
                                initialValues={{ name: '', surname: '', idNo: '', seat: seat }}
                                validationSchema={passengerSchema}
                                onSubmit={(values, actions) => {

                                    addPassenger(values)
                                    // actions.resetForm()
                                    console.log(values);
                                }}
                            // { setSubmitting}

                            >
                                {(props) => (
                                    <View style={{ marginTop: 10, marginBottom: 30, gap: 10, }}>

                                        {/* ------Name------*/}
                                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>

                                            <Text style={{ fontWeight: "500", fontSize: 18 }}>Nom: </Text>
                                            <View>
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={props.handleChange('name')}
                                                    onBlur={props.handleBlur('name')}
                                                    value={props.values.name}
                                                    placeholder='Nom'
                                                />

                                            </View>

                                        </View>
                                        <Text style={{ fontWeight: "500", fontSize: 13, color: "crimson" }}>   {props.touched.name && props.errors.name}  </Text>

                                        {/* ------ Surname ------*/}
                                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                                            <Text style={{ fontWeight: "500", fontSize: 18 }}>Prénom: </Text>
                                            <View>
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={props.handleChange('surname')}
                                                    onBlur={props.handleBlur('surname')}
                                                    value={props.values.surname}
                                                    placeholder='Prénom'
                                                />

                                            </View>
                                        </View>
                                        <Text style={{ fontWeight: "500", fontSize: 13, color: "crimson" }}>    {props.touched.surname && props.errors.surname}  </Text>

                                        {/* ------Identity------*/}
                                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                                            <Text style={{ fontWeight: "500", fontSize: 18 }}>Numéro d'identité: </Text>
                                            <View>
                                                <TextInput
                                                    style={styles.IdInput}
                                                    onChangeText={props.handleChange('idNo')}
                                                    onBlur={props.handleBlur('idNo')}
                                                    value={props.values.idNo}
                                                    keyboardType="numeric"
                                                    placeholder='Numéro de Carte'

                                                />

                                            </View>

                                        </View>
                                        <Text style={{ fontWeight: "500", fontSize: 13, color: "crimson" }}>   {props.touched.idNo && props.errors.idNo} </Text>
                                        <View style={{ width: "30%", alignSelf: "flex-end" }}>
                                            <Button
                                                color='green'
                                                title={props.isSubmitting ? "Confirmé" : "Confirmer"}
                                                type='Submit'
                                                onPress={props.handleSubmit}
                                                disabled={props.isSubmitting}
                                            />


                                        </View>


                                    </View>

                                )}


                            </Formik>

                            {/* <View style={{ flexDirection: "column", gap: 2, marginBottom: 5 }}>
                                <Text style={styles.text}>Nom Prenom </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nom Prenom"
                                    onChangeText={(text) => fullName.push([

                                        {
                                            seatNumber: seat
                                        },
                                        {
                                            fullName: text
                                        },
                                        {
                                            IdNo: IdNo
                                        }

                                    ])}
                                />
                            </View>

                            <View style={{ flexDirection: "column", gap: 2 }}>
                                <Text style={styles.text}>ID Card No  </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Numero de carte d'identité"
                                    keyboardType='numeric'
                                    onChangeText={(text) => IdNo.push(
                                        {
                                            IdNo: text
                                        }
                                    )}


                                />
                            </View> */}

                        </ScrollView>
                    )))}
                </ScrollView>

                {/* <View>

                    {
                        route.params.seats.length == "1" ? (
                            <ScrollView style={{ gap: 10, marginBottom: 20, marginTop: 10 }}>
                                <View>
                                    <Text style={{ fontWeight: "500", fontSize: 18 }}>Chaise No: 1 </Text>
                                    <View style={{ flexDirection: "column", gap: 2, marginBottom: 5 }}>
                                        <Text style={styles.text}>Nom Prenom </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Nom Prenom"
                                            placeholderTextColor={fullName ? "green" : "grey"}
                                            onChangeText={(text) => setFullName(text)}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2 }}>
                                        <Text style={styles.text}>ID Card No  </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Numero de carte d'identité"
                                            keyboardType='numeric'
                                            placeholderTextColor={IdNo ? "green" : "grey"}
                                            onChangeText={(text) => setIdNo(text)}
                                        />
                                    </View>
                                </View>


                            </ScrollView>

                        ) : route.params.seats.length == 2 ? (
                            <ScrollView style={{ gap: 10, marginBottom: 20, marginTop: 10 }}>
                                <View>
                                    <Text style={{ fontWeight: "500", fontSize: 18 }}>Chaise No: 1 </Text>
                                    <View style={{ flexDirection: "column", gap: 2, marginBottom: 5 }}>
                                        <Text style={styles.text}>Nom Prenom </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Nom Prenom"
                                            placeholderTextColor={fullName ? "green" : "grey"}
                                            onChangeText={(text) => setFullName(text)}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2 }}>
                                        <Text style={styles.text}>ID Card No  </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Numero de carte d'identité"
                                            keyboardType='numeric'
                                            placeholderTextColor={IdNo ? "green" : "grey"}
                                            onChangeText={(text) => setIdNo(text)}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontWeight: "500", fontSize: 18 }}>Chaise No:  </Text>
                                    <View style={{ flexDirection: "column", gap: 2, marginBottom: 5 }}>
                                        <Text style={styles.text}>Nom Prenom </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Nom Prenom"
                                            placeholderTextColor={fullName ? "green" : "grey"}
                                            onChangeText={(text) => setFullName(text)}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 2 }}>
                                        <Text style={styles.text}>ID Card No  </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Numero de carte d'identité"
                                            keyboardType='numeric'
                                            placeholderTextColor={IdNo ? "green" : "grey"}
                                            onChangeText={(text) => setIdNo(text)}
                                        />
                                    </View>
                                </View>


                            </ScrollView>
                        ) : route.params.seats.length == 3 ? (
                            <Text> 3 Seats </Text>
                        ) : null
                    }
                </View> */}






            </View>

            <View>



            </View>

            <Pressable
                onPress={appliquerEtContinuer}
                style={{
                    justifyContent: "center", alignItems: "center", backgroundColor: '#f8fafc',
                }} >
                {
                    // route.params.seats.length != passengerInfo.length
                    route.params.seats.length == passengerInfo.length && (
                        <View style={{ marginBottom: 30, width: 300, backgroundColor: "green", borderRadius: 5, padding: 8, alignItems: "center", justifyContent: "center" }} >
                            <Text style={{ color: "white", fontSize: 24, fontWeight: "800", textAlign: "center", letterSpacing: 1 }} > Appliquer et  continuer</Text>

                        </View>

                    )
                }


            </Pressable>
        </>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: "black",
        fontWeight: "400",
    },
    textInput: {
        width: 250, borderColor: "green", borderWidth: 0.5, padding: 3, borderRadius: 8, fontSize: 16, color: "green", fontWeight: "600", letterSpacing: 1
    },
    IdInput: {
        width: 150, borderColor: "green", borderWidth: 0.5, padding: 3, borderRadius: 8, fontSize: 16, color: "green", fontWeight: "600", letterSpacing: 1
    }
})