import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { FontAwesome } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={{ backgroundColor: "green", height: 140, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal:10}}>
 <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 30
                }} >Mon Billet Afrique</Text>

<Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 50,
                padding: 8
            }}>
                <FontAwesome6 name="bus-simple" size={24} color="white" />
               
            </Pressable>

            {/* <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 15,
                padding: 8
            }}>
                <FontAwesome6 name="bus-simple" size={24} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Bus</Text>
            </Pressable> */}

            {/* <Pressable style={{
                flexDirection: "row",
                alignItems: "center",

            }}>
                <Ionicons name="airplane-outline" size={34} color="white" style={{ transform: [{ rotate: '-50deg' }] }} />
                <Text style={{
                    marginLeft: 0,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Vol</Text>
            </Pressable>

            <Pressable style={{
                flexDirection: "row",
                alignItems: "center"

            }}>
                <FontAwesome name="bed" size={28} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Hôtel</Text>
            </Pressable>

            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",

            }}>
                <FontAwesome6 name="car" size={24} color="white" />
                <Text style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 15
                }} >Service</Text>
            </Pressable> */}


        </View>
    )
}

export default Header

const styles = StyleSheet.create({})