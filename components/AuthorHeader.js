import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthorHeader = () => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: "green", height: 65, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>

            <Pressable
                onPress={() => navigation.navigate('AllTickets')}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: 15,
                    padding: 8
                }}
            >
                <FontAwesome6 name="bus-simple" size={24} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Tickets</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('ManageAdminsandEditors')}
                style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                <Ionicons name="airplane-outline" size={34} color="white" style={{ transform: [{ rotate: '-50deg' }] }} />
                <Text style={{
                    marginLeft: 0,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Admins</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('ManageAdminsandEditors')}

                style={{
                    flexDirection: "row",
                    alignItems: "center"

                }}>
                <FontAwesome name="bed" size={28} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Editors</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('ManageUsers')}

                style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                <FontAwesome6 name="car" size={24} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Users</Text>
            </Pressable>


        </View>
    )
}

export default AuthorHeader

const styles = StyleSheet.create({})