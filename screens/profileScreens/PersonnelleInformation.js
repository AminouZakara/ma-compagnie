import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { firebase } from '@react-native-firebase/auth';
// Loader
import Loader from '../../components/Loader';


const PersonnelleInformation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);


    console.log("Pernsonel Info", route.params)

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


    const currentUser = firebase.auth().currentUser;
    console.log("Current User :", currentUser.photoURL);

    const userId = firebase.auth().currentUser?.uid;
    const user = firebase.auth().currentUser;
    const [userData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    // console.log("user data : ", userData)
    console.log("User Data...", userData)
    console.log("User Name...", userData.name)

    // Update Ticket  Form 
    const getUser = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.userData.name
                case "surname":
                    return route.params.userData.surname
                case "email":
                    return route.params.userData.email
                case "city":
                    return route.params.userData.city
                case "address":
                    return route.params.userData.address
                case "phoneNumber":
                    return route.params.userData.phoneNumber
            }

        } else
            return ""
    };


    const [name, setName] = useState(getUser('name'));
    const [email, setEmail] = useState(getUser('email'));
    const [city, setCity] = useState(getUser('city'));
    const [address, setAddress] = useState(getUser('address'));
    const [phoneNumber, setPhoneNumber] = useState(getUser('phoneNumber'));
    const [photoURL, setPhotoURL] = useState(getUser('photoURL'));
    const handleInfo = () => {
        if (route.params) {
            //Update User
            Alert.alert(
                `Modification`,
                `Voulez-vous vraiment modifier les  informations?`,
                [
                    {

                        text: 'Annuler',
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: 'Oui', onPress: () => {
                            setLoading(true)

                            //update user
                            const user = firebase.auth().currentUser;
                            const userRef = doc(db, 'users', user.uid);
                            const userUpdate = {
                                name: name,
                                email: email,
                                city: city,
                                address: address,
                                phoneNumber: phoneNumber,
                                // photoURL: photoURL
                            };
                            updateDoc(userRef, userUpdate)
                                .then(() => {
                                    Alert.alert(
                                        `Modification`,
                                        `Les informations ont été modifiées avec succès`,
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.goBack()
                                            }
                                        ]
                                    );
                                    setLoading(false)
                                }).catch((error) => {
                                    Alert.alert(
                                        `Modification`,
                                        `Une erreur est survenue`,
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.goBack()
                                            }
                                        ]
                                    );
                                });
                        }

                    }
                ]
            )

        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
                alignItems: "center",
            }}
        >
            <Loader visible={loading} />



            <View style={{ marginTop: 50 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Nom Prenom
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Nom Prenom"
                        placeholderTextColor={"orange"}
                        style={{
                            fontSize: name ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: name ? "green" : "orange"

                        }}
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Email
                    </Text>

                    <TextInput
                        value={email}
                        editable={false}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="enter your email address"

                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: "grey"
                        }}
                    />
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Phone
                    </Text>

                    <TextInput
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="96-52-43-34"
                        placeholderTextColor={phoneNumber ? 'green' : "orange"}
                        numberOfLines={1}
                        keyboardType='numeric'

                        style={{
                            fontSize: phoneNumber ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: phoneNumber ? "green" : "orange"
                        }}
                    />
                </View>


                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Ville
                    </Text>

                    <TextInput
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        placeholder="Ville"
                        placeholderTextColor={"orange"}
                        style={{
                            fontSize: city ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: city ? "green" : "orange"


                        }}
                    />
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Address
                    </Text>

                    <TextInput
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        placeholder="enter your address"
                        numberOfLines={2}
                        multiline={true}
                        placeholderTextColor={address ? 'green' : "orange"}

                        style={{
                            fontSize: address ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: address ? "green" : "orange"
                        }}
                    />
                </View>


            </View>



            <Pressable
                onPress={handleInfo}
                style={{
                    width: 300,
                    backgroundColor: "green",
                    padding: 14,
                    borderRadius: 7,
                    marginTop: 50,
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
                    Modifier
                </Text>
            </Pressable>






        </SafeAreaView>
    )
}

export default PersonnelleInformation

const styles = StyleSheet.create({})