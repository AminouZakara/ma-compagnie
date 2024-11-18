import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-web';
import { firebase } from '@react-native-firebase/auth';
import Loader from '../components/Loader';


const RegisterScreen = () => {
    const navigation = useNavigation();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [dateOfBirth, setdateOfBirth] = useState("");
    const [loading, setLoading] = useState(false)

    // let the user register by sending sending email verification
    const register = async () => {
        //check if all the fields are filled
        if (!displayName || !email || !password || !dateOfBirth) {
            Alert.alert(
                "Votre Information est Invalide",
                "SVP remplissez tous les champs",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            try {
                setLoading(true)
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await user.user.sendEmailVerification();
                await setDoc(doc(db, "users", user.user.uid), {
                    name: displayName,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    uid: user.user.uid,
                    photoURL: null,
                    emailVerified: false,
                    role: 'user',

                });
                // français
                Alert.alert("")
                Alert.alert("Félicitation!", "Utilisateur créé avec succès.Veuillez vérifier votre courrier électronique pour accéder votre compte");
                navigation.navigate("Login");
            } catch (error) {
                console.log("Error:", error);
                Alert.alert("Erreur", error.message);
                setLoading(false)
            }
        }

    }
    // const register = async () => {
    //     if (displayName === "" || email === "" || password === "" || dateOfBirth === "") {
    //         Alert.alert(
    //             "Invalid Detials",
    //             "Please enter all the credentials",
    //             [
    //                 {
    //                     text: "Cancel",
    //                     onPress: () => console.log("Cancel Pressed"),
    //                     style: "cancel"
    //                 },
    //                 { text: "OK", onPress: () => console.log("OK Pressed") }
    //             ],
    //             { cancelable: false }
    //         );
    //     }

    //     setLoading(true)
    //     const userCredential = await createUserWithEmailAndPassword(email, password);
    //     const user = userCredential.user;
    //     //send Email Verification and save data to firebase
    //     await sendEmailVerification(user);
    //     await setDoc(doc(db, "users", user.uid), {
    //         name: displayName,
    //         email: email,
    //         dateOfBirth: dateOfBirth,
    //         uid: user.uid,
    //         emailVerified: false,
    //         role: 'user',
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //         //
    //     });
    //     setLoading(false)
    //     navigation.navigate("Login")
    //     alert('A verification email has been sent to your email address. Please verify your email before logging in.');



    // }

    // ------- Date of birth ------------
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
                setdateOfBirth(currentDate.toDateString());

            }
        } else {
            toggleDatePicker()
        }
    };
    const confirmIOSDate = () => {
        setdateOfBirth(date.toDateString());
        toggleDatePicker()
    }



    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }} >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 10,
                    alignItems: "center",
                }}
            >
                <Loader visible={loading} />
                <KeyboardAvoidingView>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 80,
                        }}
                    >
                        {/* logo image */}
                        <Image
                            source={require("../assets/fLogo.jpg")}
                            style={{
                                width: 253,
                                height: 148,
                                resizeMode: "contain",

                            }}
                        />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Nom prenom
                            </Text>

                            <TextInput
                                value={displayName}
                                onChangeText={(text) => setDisplayName(text)}
                                placeholder="Nom prenom"
                                placeholderTextColor={"orange"}
                                style={{
                                    fontSize: displayName ? 17 : 17,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300,
                                    color: displayName ? "green" : "orange"

                                }}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Email
                            </Text>

                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Entrez votre adresse email"
                                placeholderTextColor={email ? 'green' : "orange"}
                                autoCapitalize={false}


                                style={{
                                    fontSize: email ? 17 : 17,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300,
                                    color: email ? "green" : "orange"
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Date de naissance
                            </Text>
                            {/* Date and Time */}
                            <Pressable
                                style={{ lexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                                <View

                                    style={{
                                        fontSize: dateOfBirth ? 17 : 17,
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 1,
                                        marginVertical: 10,
                                        width: 300,
                                    }}>
                                    {showPicker && (
                                        <DateTimePicker
                                            value={date}
                                            is24Hour={true}
                                            mode='date'
                                            onChange={onChange}
                                            minimumDate={new Date('1924-03-31')}
                                            maximumDate={new Date()}
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
                                                style={{ fontSize: 17, color: dateOfBirth ? "green" : "orange" }}
                                                // placeholder={new Date(item.eventDate).toLocaleString()}
                                                placeholder={dateOfBirth ? dateOfBirth : 'JJ - MM - AAAA'}
                                                placeholderTextColor={dateOfBirth ? "green" : 'orange'}
                                                editable={false}
                                                value={dateOfBirth}
                                                onPressIn={toggleDatePicker}


                                            />
                                        </Pressable>
                                    )}

                                </View>
                            </Pressable>

                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Mot de passe
                            </Text>

                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                placeholder="* * * * * * * * *"
                                placeholderTextColor={"orange"}
                                style={{
                                    fontSize: password ? 17 : 17,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300,
                                    color: password ? "green" : "orange"

                                }}
                            />
                        </View>

                    </View>

                    <Pressable
                        onPress={register}
                        style={{
                            width: 300,
                            backgroundColor: "#17BB34",
                            padding: 14,
                            borderRadius: 7,
                            marginTop: 30,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "white",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            Créer
                        </Text>
                    </Pressable>

                    <View

                        style={{ marginTop: 20, flexDirection: "row" }}
                    >
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
                            Vous avez déjà un compte?
                        </Text>
                        <Pressable
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ textAlign: "center", color: "#176BEF", fontSize: 15 }}> Connecter </Text>
                        </Pressable>
                    </View>


                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    )
}

export default RegisterScreen

const styles = StyleSheet.create({})