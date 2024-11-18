import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '@react-native-firebase/auth';


const ManageTheRoles = () => {
    const navigation = useNavigation();
    const route = useRoute();
    console.log("Employerr User Role:", route.params.userData.role);
    console.log("Employerr User Compagnie:", route.params.userData.companyName);

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "Roles",
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
                    <Pressable

                        style={{ flexDirection: "row", alignItems: "center", marginRight: 15, }}>
                        <Ionicons name="person" size={24} color="white" style={{ marginRight: 12 }} />

                    </Pressable>
                </View>
            )
        })
    }, [])


    // Update Ticket  Form 
    console.log("Employee: ", route.params.employee)
    const getUser = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.employee.name
                case "surname":
                    return route.params.employee.surname
                case "email":
                    return route.params.employee.email
            }

        } else
            return ""
    };

    const [name, setName] = useState(getUser('name'));
    const [surname, setSurname] = useState(getUser('surname'));
    const [email, setEmail] = useState(getUser('email'));
    console.log("Employee to be Edited's Role:", route.params.employee.role);
    console.log("Employee to be Edited's Compagnie:", route.params.employee.companyName);
    const AddorChangeToAdmin = () => {
        if (route.params) {
            //Update User
            if (route.params.employee.role === "Auteur") {

                Alert.alert(
                    `Auteur`,
                    `Vous n'avez  pas la permission de modifier les Auteurs!`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            } else if (route.params.userData.companyName === route.params.employee.companyName) {

                Alert.alert(
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment modifier pour Admin?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: () => {
                                setDoc(doc(db, "users", route.params.employee.id), {
                                    ...route.params.employee,
                                    role: "Admin",
                                    companyName: route.params.userData.companyName,
                                    addedBy: firebase.auth().currentUser.email,
                                    dateAdded: serverTimestamp(),
                                })
                                Alert.alert(
                                    `Succès`,
                                    `modification effectuée avec succès`,
                                    [
                                        {
                                            text: 'OK', onPress: () => navigation.goBack(),

                                        }
                                    ]
                                )
                            }
                        }
                    ]
                )
            } else if (!route.params.employee.companyName) {

                Alert.alert(
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment modifier pour Admin?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: () => {
                                setDoc(doc(db, "users", route.params.employee.id), {
                                    ...route.params.employee,
                                    role: "Admin",
                                    companyName: route.params.userData.companyName,
                                    addedBy: firebase.auth().currentUser.email,
                                    dateAdded: serverTimestamp(),
                                })
                                Alert.alert(
                                    `Succès`,
                                    `embauche effectuée avec succès`,
                                    [
                                        {
                                            text: 'OK', onPress: () => navigation.goBack(),

                                        }
                                    ]
                                )
                            }
                        }
                    ]
                )
            } else {
                Alert.alert(
                    `Employeé d'un autre Compagnie`,
                    `Vous n'avez  pas la permission de modifier les employeés d'un autre compagnie!`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            }

        }
    }

    const AddorChangeToEditor = () => {

        if (route.params) {
            //Update User
            if (route.params.employee.role === "Auteur") {
                Alert.alert(
                    `Auteur`,
                    `Vous n'avez  pas la permission de modifier les Auteurs!`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            } else if (route.params.userData.companyName === route.params.employee.companyName) {
                Alert.alert(
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment modifier pour Editeur?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: () => {
                                setDoc(doc(db, "users", route.params.employee.id), {
                                    ...route.params.employee,
                                    companyName: route.params.userData.companyName,
                                    role: "Editor",
                                    addedBy: firebase.auth().currentUser.email,
                                    dateAdded: serverTimestamp(),
                                })
                                navigation.goBack();
                            }
                        }
                    ]
                )
            } else if (!route.params.employee.companyName) {

                Alert.alert(
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment modifier pour Editeur?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: () => {
                                setDoc(doc(db, "users", route.params.employee.id), {
                                    ...route.params.employee,
                                    companyName: route.params.userData.companyName,
                                    role: "Editor",
                                    addedBy: firebase.auth().currentUser.email,
                                    dateAdded: serverTimestamp(),
                                })
                                Alert.alert(
                                    `Succès`,
                                    `embauche effectuée avec succès`,
                                    [
                                        {
                                            text: 'OK', onPress: () => navigation.goBack(),

                                        }
                                    ]
                                )
                            }
                        }
                    ]
                )
            } else {
                Alert.alert(
                    `Employeé d'un autre Compagnie`,
                    `Vous n'avez  pas la permission de modifier les employeés d'un autre compagnie!`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            }

        }
    }

    const RemoveRole = () => {

        if (route.params) {
            //Update User
            if (route.params.employee.role === "Auteur") {
                Alert.alert(
                    `Auteur`,
                    `C'est un Auteur. Vous n'avez  pas la permission de faire ceci`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            } else if (route.params.userData.companyName === route.params.employee.companyName) {
                Alert.alert(
                    `Confirmation de la modification`,
                    `Voulez-vous vraiment lui enlever son role?`,
                    [
                        {
                            text: 'Annuler',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'Oui', onPress: () => {
                                setDoc(doc(db, "users", route.params.employee.id), {
                                    ...route.params.employee,
                                    companyName: "",
                                    role: "",
                                    removedBy: firebase.auth().currentUser.email + " " + "On" + " " + new Date().toLocaleString(),
                                })
                                Alert.alert(
                                    `Succès`,
                                    `Annulation de role effectuée avec succès`,
                                    [
                                        {
                                            text: 'OK', onPress: () => navigation.goBack(),

                                        }
                                    ]
                                )

                            }
                        }
                    ]
                )
            } else {
                Alert.alert(
                    `Employeé d'un autre Compagnie`,
                    `Vous n'avez  pas la permission de modifier les employeés d'une autre compagnie!`,
                    [
                        {
                            text: 'OK', onPress: () => console.log("Pressed"),
                        }
                    ]
                )
            }

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

            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                }}
            >
                <Text style={{ color: "grey", fontSize: 20, fontWeight: "700" }}>
                    Gérer le rôle de <Text style={{ color: "orange", fontSize: 17, fontWeight: "400", fontStyle: "italic" }}> {route.params.employee.name}</Text>
                </Text>


            </View>

            <View style={{ marginTop: 30 }}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                        Nom prénom
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Name"
                        placeholderTextColor={"orange"}
                        editable={false}
                        style={{
                            fontSize: name ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
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
                        onChangeText={(text) => setEmail(text)}
                        placeholder="enter your email address"
                        placeholderTextColor={email ? 'green' : "orange"}
                        editable={false}

                        style={{
                            fontSize: email ? 18 : 18,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            width: 300,
                            color: email ? "green" : "orange"
                        }}
                    />
                </View>

                {
                    route.params.userData.companyName === route.params.employee.companyName ? (
                        <View style={{ marginTop: 70, flexDirection: "row", }}>
                            <Text style={{ marginLeft: 2, fontSize: 18, fontWeight: "600", color: "gray" }}>
                                Role Actuel:
                            </Text>

                            <Text style={{ marginLeft: 15, color: "green", fontSize: 17, fontWeight: "700" }}>
                                {route.params.employee.role}
                            </Text>

                        </View>
                    ) : (
                        <View style={{ marginTop: 70, flexDirection: "row", }}>
                            <Text style={{ marginLeft: 2, fontSize: 12, fontWeight: "600", color: "gray" }}>
                                {route.params.employee.name} n'est pas encore votre employé!
                            </Text>
                        </View>



                    )
                }


            </View>


            {
                route.params.userData.role === "Auteur" ? (
                    <Pressable
                        onPress={AddorChangeToAdmin}
                        style={{
                            width: 300,
                            backgroundColor: "white",
                            padding: 14,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                            elevation: 10

                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "green",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Ajouter / Modifier en administrateur
                        </Text>
                    </Pressable>
                ) : (null)
            }



            <Pressable
                onPress={AddorChangeToEditor}
                style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 14,
                    borderRadius: 7,
                    marginTop: 30,
                    marginLeft: "auto",
                    marginRight: "auto",
                    elevation: 10

                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "orange",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Ajouter / Modifier en éditeur
                </Text>
            </Pressable>

            <Pressable
                onPress={RemoveRole}
                style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 14,
                    borderRadius: 7,
                    marginTop: 30,
                    marginLeft: "auto",
                    marginRight: "auto",
                    elevation: 10
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Supprimer le rôle
                </Text>
            </Pressable>






        </SafeAreaView>
    )
}

export default ManageTheRoles

const styles = StyleSheet.create({})