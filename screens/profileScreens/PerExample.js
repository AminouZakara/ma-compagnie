import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { firebase } from '@react-native-firebase/auth';


const PersonnelleInformation = () => {
    const navigation = useNavigation();
    const route = useRoute();

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
                case "address":
                    return route.params.userData.address
                case "phoneNumber":
                    return route.params.userData.phoneNumber
            }

        } else
            return ""
    };

    const [name, setName] = useState(getUser('name'));
    const [surname, setSurname] = useState(getUser('surname'));
    const [email, setEmail] = useState(getUser('email'));
    const [address, setAddress] = useState(getUser('address'));
    const [phoneNumber, setPhoneNumber] = useState(getUser('phoneNumber'));
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
                            setDoc(doc(db, "users", route.params.userData.userID), {
                                ...route.params.userData,
                                name,
                                surname,
                                email,
                                address,
                                phoneNumber,
                                ModifiedBy: firebase.auth().currentUser.email,
                                ModifiedAt: new Date().toLocaleString(),
                            })
                            navigation.navigate("MyProfile");

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



            <View style={{ marginTop: 50 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Name"
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
                        Surname
                    </Text>

                    <TextInput
                        value={surname}
                        onChangeText={(text) => setSurname(text)}
                        placeholder="Surname"
                        placeholderTextColor={"orange"}
                        style={{
                            fontSize: surname ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                            color: surname ? "green" : "orange"


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