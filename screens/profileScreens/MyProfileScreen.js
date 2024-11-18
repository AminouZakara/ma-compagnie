import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../firebase';
import { firebase } from '@react-native-firebase/auth';



const MyProfileScreen = () => {
    const navigation = useNavigation();

    const userId = firebase.auth().currentUser.uid;
    const [userData, setUserData] = useState("")


    useLayoutEffect(() => {
        navigation.setOptions({

            headerShown: true,
            title: "My Profile",
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
    console.log(userData)




    return (
        <View style={styles.container} >
            <View>
                <Pressable
                    onPress={() => navigation.navigate("PersonnelleInformation", {
                        userData: userData
                    })}
                    style={{ marginTop: 20, backgroundColor: "white", padding: 4, borderRadius: 5, elevation: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AntDesign name="infocirlce" size={24} color="lightgray" />
                            <Text style={{ marginLeft: 8, letterSpacing: 0.5 }} >Personnelle Information</Text>
                        </View>

                        <MaterialIcons name="navigate-next" size={24} color="gray" />
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('MotDePasse')}
                    style={{ marginTop: 20, backgroundColor: "white", padding: 4, borderRadius: 5, elevation: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <FontAwesome5 name="lock" size={24} color="lightgray" />
                            <Text style={{ marginLeft: 8, letterSpacing: 0.5 }} >Mot de Passe</Text>
                        </View>

                        <MaterialIcons name="navigate-next" size={24} color="gray" />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,



    }
})