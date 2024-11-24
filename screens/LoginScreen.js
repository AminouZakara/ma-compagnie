import { Alert, BackHandler, Button, Image, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
//SignINWıthGoogle
// import 'expo-dev-client'
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
// Loader
import Loader from '../components/Loader';
import BgLoader from '../components/BgLoader';
import BgLoaderScreen from './BgLoaderScreen';


const LoginScreen = () => {
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: "954218532580-igmq7nn8kntfgl86q3vnv4hvoh8hhvjl.apps.googleusercontent.com"
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //---- SignInWithGoogle ---- react native expo google login and save user data in firebase
    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
            const user = await firebase.auth().signInWithCredential(googleCredential);
            console.log(user);
            // if user is a new sign in, save data
            if (user.additionalUserInfo.isNewUser) {
                const docRef = await setDoc(doc(db, "users", user.user.uid), {
                    name: user.user.displayName,
                    email: user.user.email,
                    photoURL: user.user.photoURL,
                    uid: user.user.uid,
                    role: 'user',
                    uid: user.user.uid,
                });
            }
            navigation.navigate('Main');
        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    };

    //----- handleLogin -----  if the user email is verified login
    const handleLogin = async () => {
        if (!email || !password) {
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
                setLoading(true);
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                if (user.user.emailVerified) {
                    navigation.navigate('Main');
                } else {
                    Alert.alert(
                        "Email non Verifié",
                        "SVP verifier votre email avant de vous connecter",
                        [
                            {
                                text: "OK", onPress: () => {
                                    firebase.auth().signOut();
                                    navigation.navigate('Login');
                                    console.log("OK Pressed")
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                    setLoading(false);

                }
            } catch (error) {
                Alert.alert(
                    "Incorrect",
                    error.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                setError(error.message);
                setLoading(false);
            }
        }

    };


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

    //envoyer un email de réinitialisation de Mot de passe oublié
    const forgotPassword = () => {
        if (email) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    Alert.alert(
                        "Réinitialisation de mot de passe",
                        "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email Veuillez consulter votre boîte de réception.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed")
                            }
                        ],
                        { cancelable: false }
                    );
                })
                .catch((err) => {
                    Alert.alert(
                        "Réinitialisation de mot de passe",
                        "Une erreur est survenue lors de l'envoi de l'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed")
                            }
                        ],
                        { cancelable: false }
                    );
                });
        }
        else {
            Alert.alert(
                "Réinitialisation de mot de passe",
                "Veuillez saisir votre adresse email",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }
                ],
                { cancelable: false }
            );
        }
    };




    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
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
                            marginTop: 100,
                        }}
                    >
                        {/* <Text style={{ color: "green", fontSize: 17, fontWeight: "700" }}>
                            Registrer
                        </Text> */}
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

                    {/* ----------- Email and Password ------------- */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Email
                            </Text>

                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Entrer votre address email"
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
                                Mot de passe
                            </Text>

                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                placeholder="* * * * * * * * * * * "
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
                        onPress={handleLogin}
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
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            CONNECTER
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={signInWithGoogle}
                        style={{
                            width: 300,
                            backgroundColor: "#176BEF",
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
                                fontSize: 15,
                                fontWeight: "bold",
                            }}
                        >
                            Connecter avec Google
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{ marginTop: 30 }}
                        onPress={forgotPassword}
                    >
                        <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>Mot de passe oublié?</Text>
                    </Pressable>

                    <View

                        style={{ marginTop: 5, flexDirection: "row" }}
                    >
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
                            Vous n'avez pas un compte?
                        </Text>
                        <Pressable
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ textAlign: "center", color: "#176BEF", fontSize: 15 }}> Créer ici</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>


            </SafeAreaView>

        </TouchableWithoutFeedback>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: "center",
    },
    title: {}
})