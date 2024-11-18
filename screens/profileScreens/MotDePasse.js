import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebase } from '@react-native-firebase/auth';


const MotDePasse = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Modifier Mon Profile",
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
                        <FontAwesome6 name="add" size={14} color="white" />
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }} > Ticket</Text>

                    </Pressable> */}

                    <EvilIcons name="user" size={60} color="white" />
                </View>
            )
        })
    }, [])

    // Reset Password 
    const email = firebase.auth().currentUser.email;

    const handleResetPassword = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email)
                .then(() => {

                    Alert.alert(
                        ` Email Sent!`,
                        ` Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail! `,
                        [
                            {
                                text: 'OK', onPress: () => console.log("OK Pressed"),
                            }
                        ]
                    )
                })

        } catch (error) {
            console.log(error);
            alert('Erreur lors de la réinitialisation du mot de passe')
        }
    };

    return (
        <View style={{ flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={handleResetPassword}
                style={{ marginTop: 20, padding: 4, elevation: 20 }}>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 5, justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", }} >
                        <Text style={{ fontSize: 18, color: "green", fontWeight: "600", marginLeft: 8, paddingVertical: 15, paddingHorizontal: 10, letterSpacing: 0.5 }} >Changer Mot de Passe </Text>
                    </View>

                </View>
            </Pressable>
        </View>
    )
}

export default MotDePasse

const styles = StyleSheet.create({})