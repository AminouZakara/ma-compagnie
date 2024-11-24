import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../firebase';
import { firebase } from '@react-native-firebase/auth';



const ProfileScreen = () => {
    const navigation = useNavigation();
    const userId = firebase.auth().currentUser?.uid;
    const user = firebase.auth().currentUser;
    const [userData, setUserData] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleLogout = async () => {
        Alert.alert("Déconnecter!", "Êtes-vous certain de vouloir vous déconnecter?",
            [
                {
                    text: "Non",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Oui", onPress: () => {
                        try {
                            firebase.auth().signOut()
                                .then(() => {
                                    navigation.replace('Login')
                                    console.log('User signed out!')
                                })
                        }
                        catch (error) {
                            alert(error.message)
                            console.log(error)
                        }


                    }
                }
            ],
            { cancelable: false }
        );
        return true;


    };

    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: <View>
                <Text style={styles.headerTitle}> Mon Compte </Text>
            </View>,
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
                <Pressable
                    onPress={() => navigation.navigate("MyProfile")}
                >
                    <EvilIcons name="user" size={100} color="white" />


                </Pressable>
            )

        })
    }, [])

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

    //--------

    //-------

    return (
        <View style={styles.container} >
            {
                isLoading ? (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: 50 }} >
                        <ActivityIndicator size="large" color="green" />
                    </View>
                ) : (
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 5, borderRadius: 5, elevation: 2 }} >
                            <Text style={{ fontSize: 16, color: "orange", fontWeight: "500" }}>  {userData.name}  </Text>
                            <Text style={{ fontSize: 12, color: "orange", fontWeight: "400" }}> {user ? `${user.email}` : ''}</Text>
                            {/* display profile name   */}
                        </View >

                        {
                            userData && userData.role == "Admin" || userData.role == "Editor" ? (null) : (
                                <Pressable
                                    onPress={() => navigation.navigate("MyProfile")}
                                    style={{ marginTop: 20, backgroundColor: "white", padding: 4, borderRadius: 5, elevation: 10 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Ionicons name="person" size={24} color="lightgray" />
                                            <Text style={{ marginLeft: 8, letterSpacing: 0.5 }} >Modifier Mon Profil</Text>
                                        </View>

                                        <MaterialIcons name="navigate-next" size={24} color="gray" />
                                    </View>
                                </Pressable>

                            )
                        }


                        <Pressable
                            onPress={() => handleLogout()}
                            style={{ marginTop: 10, backgroundColor: "white", padding: 4, borderRadius: 5, elevation: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    <AntDesign name="logout" size={24} color="lightgray" />
                                    <Text style={{ marginLeft: 8, letterSpacing: 0.5 }} >Déconnecter</Text>
                                </View>

                                <MaterialIcons name="navigate-next" size={24} color="gray" />
                            </View>
                        </Pressable>
                    </View>
                )
            }
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: '500',
        alignSelf: "center",
        letterSpacing: -0.2
    }
})